"use client";

import { useState } from "react";

export default function useNewsletterForm() {
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

    if (!firstName.trim()) {
      setFormState("error");
      setErrorMessage("Please enter your first name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setFormState("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setFormState("success");
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
