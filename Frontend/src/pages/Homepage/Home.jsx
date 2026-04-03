import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SoftBackdrop from "../../components/SoftBackdrop";
import LenisScroll from "../../components/lenis";

import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Pricing from "../../components/Pricing";
import Faq from "../../components/Faq";
import CTA from "../../components/CTA";

export default function Home() {
    const [msg, setMsg] = useState("Loading...");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/test");
                const data = await res.json();
                setMsg(data.message);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <SoftBackdrop />
            <LenisScroll />
            <Navbar />

            <h2 style={{ textAlign: "center" }}>{msg}</h2>

            <Hero />
            <Features />
            <Pricing />
            <Faq />
            <CTA />

            <Footer />
        </>
    );
}