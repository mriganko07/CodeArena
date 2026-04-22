import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SoftBackdrop from "../../components/SoftBackdrop";
import LenisScroll from "../../components/lenis";
import Header from "../../components/Header";
import DriveCard from "../../components/DriveCard";
import DateTime from "../../components/DateTime";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const pastDrives = [
    {
        id: 1,
        title: "Techno India Group of Institutions Kolkata Bot Assessment 24th Feb",
        date: "Feb 24, 2026",
        status: "Completed",
    },
    {
        id: 2,
        title: "Techno India Group of Institutions Kolkata 30 Jan",
        date: "Jan 30, 2026",
        status: "Completed",
    },
    {
        id: 3,
        title: "Global Tech Solutions Coding Challenge",
        date: "Dec 15, 2025",
        status: "Pending",
    },
];

const DrivePreview = () => {
    const { user } = useAuth();
    
    const fullName = user ? `${user.firstName} ${user.lastName}` : "User";

    return (
        <>
            <SoftBackdrop />
            <LenisScroll />

            <Header />

            <motion.div
                className="p-6 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <DateTime />

                <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300 bg-clip-text text-transparent">
                    Welcome, {fullName}
                </h1>

                <div className="text-gray-300 text-sm font-medium mb-4">
                    PAST DRIVES
                </div>

                <div className="space-y-4">
                    {pastDrives.map((drive, index) => (
                        <motion.div
                            key={drive.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <DriveCard drive={drive} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default DrivePreview;