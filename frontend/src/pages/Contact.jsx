import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/shopContext";

const Contact = () => {
  const { backendUrl } = useContext(ShopContext);

  // Add form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/contact`, {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      });
      // Clear form on success
      if (response.data.success) {
        e.target.reset();
        toast.success("Contact email sent");
      } else {
        toast.error(response.data.message);
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-teal-800">
              Get In Touch
            </h1>
            <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you! Our team
              is here to help make your coastal lifestyle dreams come true.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form - Takes up 3 columns */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-teal"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-teal"
                      required
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here"
                    rows="6"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-teal"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-teal text-white py-3 px-6 rounded-lg shadow-lg hover:bg-darkTeal transition-colors text-lg font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info Cards - Takes up 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  title: "Email Us",
                  info: "support@sunnyshores.com",
                  icon: "📧",
                },
                {
                  title: "Call Us",
                  info: "+1 (123) 456-7890",
                  icon: "📞",
                },
                {
                  title: "Visit Us",
                  info: "123 Beachside Blvd, Coastal City, CA 90001",
                  icon: "📍",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-teal-700">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.info}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-teal-800 mb-3">
                  Customer Service Hours
                </h3>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 6:00 PM PST
                  <br />
                  Saturday: 10:00 AM - 4:00 PM PST
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
