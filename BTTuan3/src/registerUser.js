import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import axios from 'axios';
import { Buffer } from 'buffer';

// Hàm tạo OTP 6 số
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hàm gửi OTP qua Mailjet
const sendOTP = async (email) => {
  const otp = generateOTP();
  const apiKey = '1332a41efd1adde94b1ed80ad1db1792'; // Thay bằng API Key của bạn
  const apiSecret = '62f8ba1b90b003bee6a850603f9e9a19'; // Thay bằng Secret Key của bạn

  const authHeader = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`;

  const mailjetConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
  };

  const data = {
    Messages: [
      {
        From: {
          Email: "locvbn13@gmail.com", // Thay bằng email của bạn
          Name: "KhaiHoan",
        },
        To: [
          {
            Email: email,
            Name: "Recipient Name",
          },
        ],
        Subject: "Your OTP Code",
        TextPart: `Your OTP code is ${otp}`,
        HTMLPart: `<h3>Your OTP code is <strong>${otp}</strong></h3>`,
      },
    ],
  };

  try {
    const response = await axios.post('https://api.mailjet.com/v3.1/send', data, mailjetConfig);
    console.log('Email sent successfully:', response.data);
    return otp;
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
    throw new Error('Failed to send OTP');
  }
};

export const registerUser = async (email, password, fullName, birthDate, address, profession) => {
  try {
    // Đăng ký người dùng với Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Lưu thông tin người dùng vào Firestore
    await setDoc(doc(db, 'users', user.uid), {
      fullName,
      birthDate,
      address,
      profession,
      email
    });

    // Gửi OTP
    const otp = await sendOTP(email);
    return { user, otp };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
