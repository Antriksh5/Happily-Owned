import { useState } from 'react'
import { Calendar, Video } from 'lucide-react'

export default function Consultation() {
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    inquiryType: '',
    message: '',
    date: '',
  })

  const handleTimeChange = (e) => {
    let val = e.target.value
    if (val) {
      if (val < '09:00') val = '09:00'
      if (val > '18:00') val = '18:00'
    }
    setSelectedTime(val)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.date || !selectedTime) {
      alert('Please fill in your name, date, and time.')
      return
    }

    const startDateTime = new Date(`${formData.date}T${selectedTime}`)
    const endDateTime = new Date(startDateTime.getTime() + 15 * 60000)

    const formatGoogleDate = (d) => {
      return d.toISOString().replace(/-|:|\.\d\d\d/g, '')
    }

    const startStr = formatGoogleDate(startDateTime)
    const endStr = formatGoogleDate(endDateTime)
    
    const details = `Consultation Inquiry\n\n` +
                    `Country: ${formData.country}\n` +
                    `Inquiry Type: ${formData.inquiryType}\n` +
                    `Message: ${formData.message}`

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Consultation+with+${encodeURIComponent(formData.name)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}&location=Google+Meet&add=antrikshnahar@gmail.com`

    window.open(url, '_blank')
  }

  return (
    <section id="consultation" className="py-20 bg-transparent border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-primary font-bold tracking-wider uppercase text-lg mb-3 block">Consultation</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-secondary mb-6">
            Navigate Indian Real Estate With Confidence
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto font-light">
            Schedule a 1-on-1 session with our senior NRI investment advisors.
          </p>
        </div>
        <div className="bg-white rounded-[2rem] shadow-soft border border-gray-100 overflow-hidden max-w-6xl mx-auto">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100 gap-4 flex-col md:flex-row md:text-left text-center">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-secondary mb-2">
                  Book Your 15-Min Consultation
                </h3>
                <p className="text-sm text-text-muted">
                  Share a few details and reserve a time slot in one place.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full text-sm text-primary font-medium">
                <Video className="h-4 w-4" aria-hidden="true" />
                Video Call
              </div>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-6 lg:gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition placeholder-gray-400"
                    placeholder="Enter your full name"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Country of Residence</label>
                  <select name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition">
                    <option disabled value="">Select country</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="UAE">UAE</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Inquiry Type</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition">
                    <option disabled value="">Select type</option>
                    <option value="Buying">Buying</option>
                    <option value="Selling">Selling</option>
                    <option value="Management">Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition h-24 resize-none placeholder-gray-400"
                    placeholder="Briefly describe what you'd like to discuss..."
                  ></textarea>
                </div>
              </div>
              <div className="space-y-5">
                <div className="space-y-2 pt-2 xl:pt-0 border-t border-gray-100 xl:border-t-0 xl:border-l xl:border-gray-100 xl:pl-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Date &amp; Time Slot</label>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      type="date"
                      required
                    />
                    <input
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      type="time"
                      name="timeslot"
                      min="09:00"
                      max="18:00"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 xl:pl-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center xl:text-left">
                    <div className="text-xs text-blue-700 space-y-1">
                      <p className="font-medium">
                        Please select a slot within our office hours (9:00 AM - 6:00 PM IST)
                      </p>
                      <p>Consultation available in English and Hindi only.</p>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-secondary text-white hover:bg-gray-800 font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-[0.99] flex items-center justify-center gap-3">
                    <Calendar className="h-5 w-5" aria-hidden="true" />
                    Schedule Google Meet
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
