import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { txtDB } from './storageFirebase';
import styles from './Complaint.module.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const complaintsCollection = collection(txtDB, 'txtData');
        const snapshot = await getDocs(complaintsCollection);
        const complaintsList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setComplaints(complaintsList);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  // Format phone number to E.164 format
  const formatPhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    if (cleanedNumber.length === 10 && /^[6789]/.test(cleanedNumber)) {
      return `+91${cleanedNumber}`;
    }

    throw new Error('Invalid phone number format');
  };

  // Send SMS using the server API
  const sendSms = async (phoneNumber, message) => {
    try {
      const formattedNumber = formatPhoneNumber(phoneNumber);
      const response = await fetch('https://shresta-1-nuem.onrender.com/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formattedNumber,
          body: message,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  // Handle complaint deletion and sending SMS
  const handleDelete = async (id) => {
    try {
      const complaintRef = doc(txtDB, 'txtData', id);
      const complaintSnap = await getDoc(complaintRef);
      const complaint = complaintSnap.data();

      if (complaint && complaint.phoneNumber) {
        await sendSms(complaint.phoneNumber, 'Your Issue has been Resolved 🎉 Thanks for Being Responsible 😄');
      }

      await deleteDoc(complaintRef);
      setComplaints(complaints.filter(complaint => complaint.id !== id));
      toast.success('Complaint Resolved and Deleted successfully! 🎉');
    } catch (error) {
      console.error('Error deleting complaint:', error);
      toast.error('Error deleting complaint! ❌');
    }
  };

  const handleStatusChange = async (id, isChecked) => {
    try {
      const complaintRef = doc(txtDB, 'txtData', id);
      await updateDoc(complaintRef, { isFinished: isChecked });
      setComplaints(complaints.map(complaint =>
        complaint.id === id ? { ...complaint, isFinished: isChecked } : complaint
      ));
      toast.success('Status updated successfully! ✅');
    } catch (error) {
      console.error('Error updating complaint status:', error);
      toast.error('Error updating complaint status! ❌');
    }
  };

  return (
    <div className={styles.complaintsPage}>
      <div className={styles.complaintsCard}>
        <div className={styles.cardHeader}>
          <h1>Complaints</h1>
        </div>
        <div className={styles.cardContent}>
          <ul className={styles.complaintsList}>
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <li key={complaint.id} className={styles.complaintItem}>
                  {complaint.imgUrl && (
                    <img src={complaint.imgUrl} alt="Complaint" className={styles.complaintImage} />
                  )}
                  <div className={styles.complaintText}>
                    <p>{complaint.txtVal}</p>
                  </div>
                  <div className={styles.complaintStatus}>
                    <input
                      type="checkbox"
                      className={styles.statusCheckbox}
                      checked={complaint.isFinished || false}
                      onChange={(e) => handleStatusChange(complaint.id, e.target.checked)}
                    />
                    <label>Finished</label>
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(complaint.id)}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <div className={styles.noComplaintsText}>
                <h3>📢 No Complaints Found</h3>
                <h2>
                  There are no complaints at the moment.
                  <span className={styles.emoji}>🤝</span>
                </h2>
              </div>
            )}
          </ul>
          <div className={styles.buttonContainer}>
            <button
              className={styles.backButton}
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </button>
            <button
              className={styles.hideButton}
              onClick={() => window.history.back()}
            >
              Hide Complaints
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ComplaintsPage;