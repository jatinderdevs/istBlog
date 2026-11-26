"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SUBSCRIBED_KEY, writeStorage } from "@/lib/newsletter";

// `source` names the form position (e.g. "post-inline", "post-end",
// "slide-in", "home", "rent-checker", "newsletter-page"). It is saved to the
// subscriber in MailerLite and sent to GA4 so you can see which forms work.
export default function useNewsletterForm(source = "unknown") {
  const pathname = usePathname();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(field, value) {
    if (field === "firstName") setFirstName(value);
    if (field === "email") setEmail(value);
    if (formState === "error") setFormState("idle");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setFormState("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          source,
          page: pathname || "",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFormState("success");
        writeStorage(SUBSCRIBED_KEY, "1");
        // GA4 event. Mark "newsletter_signup" as a key event in GA4 Admin.
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "newsletter_signup", {
            form_location: source,
            page_path: pathname || "",
          });
        }
      } else {
        setFormState("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return {
    firstName,
    email,
    formState,
    errorMessage,
    handleChange,
    handleSubmit,
  };
}
