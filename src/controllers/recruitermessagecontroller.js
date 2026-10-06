import { createRecruiterMessage,getRecruiterMessages } from "../models/recruitermodel.js";

export const createMessageController = async (req, res) => {
    try {
        const {
            sender_name,
            sender_email,
            subject,
            message
        } = req.body;

        if (!sender_name || !sender_email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Tumhara email backend se aayega
        const receiver_email = process.env.RECEIVER_EMAIL;

        // 1. Database me save
        const newMessage = await createRecruiterMessage({
            sender_name,
            sender_email,
            receiver_email,
            subject,
            message
        });

        // 2. n8n webhook ko data bhejo
        await fetch(process.env.N8N_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sender_name,
                sender_email,
                receiver_email,
                subject,
                message
            })
        });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        console.error("Create recruiter message error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send message"
        });
    }
};
export const getMessagesController = async (req, res) => {
    try {
        const messages = await getRecruiterMessages();

        return res.status(200).json({
            success: true,
            count: messages.length,
            messages
        });

    } catch (error) {
        console.error("Get recruiter messages error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch recruiter messages"
        });
    }
};