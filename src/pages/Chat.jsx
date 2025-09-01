import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const quickReplies = ["Where is my order?", "Payment issues", "Cancel my order", "Talk to support"];

const Chat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can we help you today?" }]);
  const [input, setInput] = useState("");
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
      return;
    }

    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("chatMessage", msg => {
      setMessages(prev => [...prev, { sender: "user", text: msg }]);
    });

    return () => socketRef.current.disconnect();
  }, [user, navigate]);

  const handleMessage = (msg, sender, isQuickReply = false) => {
    setMessages(prev => [...prev, { sender, text: msg, isQuickReply }]);
    if (sender === "user") {
      setTimeout(() => {
        const reply = generateBotReply(msg);
        setMessages(prev => [...prev, { sender: "bot", text: reply }]);
      }, 1000);
    }
  };

  const generateBotReply = msg => {
    const lower = msg.toLowerCase();
    if (lower.includes("order")) return "Can you provide your order ID?";
    if (lower.includes("payment")) return "Please check your payment method or contact support.";
    if (lower.includes("cancel")) return "You can cancel your order from the Orders page.";
    return "Thank you for your message. Our support will contact you shortly.";
  };

  const sendMessage = () => {
    if (input.trim() === "") return;
    socketRef.current.emit("chatMessage", input);
    handleMessage(input, "user");
    setInput("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Chat Support</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "bot" ? "left" : "right", marginBottom: "8px" }}>
            <span style={{
              display: "inline-block",
              padding: "5px 10px",
              borderRadius: "10px",
              backgroundColor: msg.sender === "bot" ? "#eee" : msg.isQuickReply ? "#a5d6a7" : "#4caf50",
              color: msg.sender === "bot" ? "#000" : "#fff",
              fontStyle: msg.isQuickReply ? "italic" : "normal",
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." style={{ width: "70%", padding: "8px" }} />
        <button onClick={sendMessage} style={{ width: "28%", padding: "8px", marginLeft: "2%" }}>Send</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {quickReplies.map((q, i) => (
          <button key={i} onClick={() => handleMessage(q, "user", true)} style={{
            padding: "5px 10px",
            borderRadius: "20px",
            border: "1px solid #4caf50",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}>{q}</button>
        ))}
      </div>
    </div>
  );
};

export default Chat;
