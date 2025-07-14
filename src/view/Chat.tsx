import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Link,
  TextField,
  IconButton,
  Paper,
  Typography,
  Stack,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

interface ChatHistoryResponse {
  messages: Message[];
}

interface ChatReplyResponse {
  reply: string;
}

const ChatDashboard: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      setUsername(localStorage.getItem("username"));

      axios
        .get<ChatHistoryResponse>("http://localhost:4000/auth/chat/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: AxiosResponse<ChatHistoryResponse>) => {
          setMessages(res.data.messages);
        })
        .catch((err) => {
          console.error("Error fetching history:", err);
        });
    }
  }, [navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessages]);
    setInput("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post<ChatReplyResponse>(
        "http://localhost:4000/auth/chat",
        {
          role: "user",
          content: input,
          timestamp: newMessages.timestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: response.data.reply,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: "⚠️ Error: Unable to reach ChatGPT.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <Box display="flex" flexDirection="column" height="80vh" width="99%" p={2}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Chat with ChatGPT
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            {username && (
              <Typography variant="body1" color="inherit">
                Hello,{username}!
              </Typography>
            )}
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        className="align-items-center d-flex align-items-center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Paper
          elevation={3}
          sx={{ flex: 1, overflowY: "auto", p: 2, mb: 2, height: "75vh" }}
        >
          <Stack spacing={2}>
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                alignSelf={msg.role === "user" ? "flex-end" : "flex-start"}
                bgcolor={msg.role === "user" ? "#1976d2" : "#eeeeee"}
                color={msg.role === "user" ? "white" : "black"}
                px={2}
                py={1}
                borderRadius={2}
                maxWidth="70%"
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {msg.content}
                </Typography>
                <Divider sx={{ my: 0.5 }} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  textAlign="right"
                >
                  {msg.role === "user" ? "You" : "ChatGPT"} •{" "}
                  {formatTime(msg.timestamp)}
                </Typography>
              </Box>
            ))}
            {loading && (
              <Box sx={{ my: 1, display: "flex", alignItems: "center" }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography variant="body2">Wait a momment...</Typography>
              </Box>
            )}
            <div ref={bottomRef} />
          </Stack>
        </Paper>

        <Box
          display="flex"
          p={2}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 5,
            display: "flex",
            alignItems: "center",
            width: "95%",
          }}
          className="container"
        >
          <TextField
            fullWidth
            placeholder="Type your message..."
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <IconButton onClick={handleSend} color="primary" sx={{ ml: 2 }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatDashboard;
