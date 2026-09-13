"use client"

import { useState } from "react"

export default function Home() {
  const [tab, setTab] = useState("visa");
  const [country, setCountry] = useState("");
  const [tour, setTour] = useState("");
  const [visaType, setVisaType] = useState("");
  const [result, setResult] = useState("")
  const [showOffers, setShowOffers] = useState(false)

  const countryPhotos: any = {
    "": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    "UAE": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200",
    "Saudi": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "USA": "https://images.unsplash.com/photo-1485738422979-e7d0f08eeaf6?w=1200",
    "Canada": "https://images.unsplash.com/photo-1503614478163-cffdde4cc758?w=1200",
    "UK": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
    "Schengen": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200"
  }

  const tourPhotos: any = {
    "": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    "Umrah Package - Economy": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "Umrah Package - 4 Star": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "Umrah Package - 5 Star": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "Hajj 2027 - Pre-Register Now": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "Turkey Family Tour": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200",
    "Malaysia Friends Tour": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1200",
    "Dubai Luxury Tour": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200"
  }

  const visaOffers: any = {
    "UAE": [
      {type: "Visit Visa 30 Days", price: "PKR 45,000", time: "3-5 Working Days"},
      {type: "Visit Visa 60 Days", price: "PKR 75,000", time: "3-5 Working Days"},
      {type: "Work Visa", price: "PKR 150,000", time: "10-15 Working Days"}
    ],
    "Saudi": [
      {type: "Umrah Visa", price: "PKR 55,000", time: "24-48 Hours"},
      {type: "Visit Visa", price: "PKR 60,000", time: "5-7 Working Days"},
      {type: "Work Visa", price: "PKR 200,000", time: "15-20 Working Days"}
    ],
    "USA": [
      {type: "B1/B2 Visit Visa", price: "PKR 35,000 + Embassy Fee", time: "15-30 Days"},
      {type: "Student Visa F1", price: "PKR 40,000 + SEVIS", time: "30-45 Days"},
      {type: "Work Visa H1B", price: "Consultation Required", time: "60-90 Days"}
    ],
    "Canada": [
      {type: "Visitor Visa", price: "PKR 50,000", time: "20-30 Days"},
      {type: "Study Permit", price: "PKR 55,000", time: "30-60 Days"},
      {type: "Work Permit", price: "PKR 80,000", time: "45-60 Days"}
    ],
    "UK": [
      {type: "Standard Visitor", price: "PKR 60,000", time: "15-20 Days"},
      {type: "Student Visa", price: "PKR 65,000", time: "3-6 Weeks"},
      {type: "Skilled Worker", price: "PKR 120,000", time: "8 Weeks"}
    ],
    "Schengen": [
      {type: "Tourist Visa", price: "PKR 55,000", time: "15-20 Days"},
      {type: "Business Visa", price: "PKR 60,000", time: "15-20 Days"},
      {type: "Transit Visa", price: "PKR 40,000", time: "10-15 Days"}
    ]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country ||!visaType) {
      setResult("Please select Country and Visa Type")
      return
    }
    setShowOffers(true)
    setResult(`✅ Application submitted for ${visaType} to ${country}`)
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify
