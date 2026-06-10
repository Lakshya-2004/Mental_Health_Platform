import express from "express";
import MeetingRequest from "../models/MeetingRequest";

const router = express.Router();

/* Create Meeting Request */
router.post("/", async (req, res) => {
  try {
    console.log("📥 NEW MEETING REQUEST");
    console.log(req.body);

    const meeting = await MeetingRequest.create(req.body);

    console.log("✅ SAVED:", meeting._id);

    res.status(201).json({
      success: true,
      meeting,
    });
  } catch (error) {
    console.error("❌ CREATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create meeting request",
    });
  }
});

/* Get All Requests */
router.get("/", async (_req, res) => {
  try {
    console.log("📋 FETCHING ALL MEETINGS");

    const meetings = await MeetingRequest.find().sort({
      createdAt: -1,
    });

    console.log(`✅ FOUND ${meetings.length} REQUESTS`);

    res.json({
      success: true,
      meetings,
    });
  } catch (error) {
    console.error("❌ FETCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch meetings",
    });
  }
});
router.get("/user/:userId", async (req, res) => {
  try {
    const meetings = await MeetingRequest.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      meetings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user meetings",
    });
  }
});
/* Accept Meeting */
router.patch("/:id/accept", async (req, res) => {
  try {
    console.log("🟢 ACCEPT ROUTE HIT");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const meeting = await MeetingRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: "accepted",
        meetLink: req.body.meetLink,
      },
      { new: true }
    );

    if (!meeting) {
      console.log("❌ MEETING NOT FOUND");

      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    console.log("✅ MEETING ACCEPTED");

    res.json({
      success: true,
      meeting,
    });
  } catch (error) {
    console.error("❌ ACCEPT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to accept meeting",
    });
  }
});

/* Reject Meeting */
router.patch("/:id/reject", async (req, res) => {
  try {
    console.log("🔴 REJECT ROUTE HIT");
    console.log("ID:", req.params.id);

    const meeting = await MeetingRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
      },
      { new: true }
    );

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    console.log("✅ MEETING REJECTED");

    res.json({
      success: true,
      meeting,
    });
  } catch (error) {
    console.error("❌ REJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reject meeting",
    });
  }
});

export default router;