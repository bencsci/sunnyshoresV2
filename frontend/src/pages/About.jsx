import React from "react";
import beach from "../assets/beach.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-teal-800">
              About Sunny Shores
            </h1>
            <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Welcome to{" "}
                <span className="text-teal-600 font-semibold">
                  Sunny Shores
                </span>
                , your one-stop destination for embracing the coastal lifestyle.
                Established in 2024, we are dedicated to bringing you
                high-quality products that capture the essence of sun, sand, and
                surf.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Whether you're a surfer, a beach lover, or simply someone who
                appreciates the vibrant energy of summer, we have something
                special for you.
              </p>
            </div>
            <div className="relative">
              <img
                src={beach}
                alt="Coastal Lifestyle"
                className="rounded-2xl shadow-2xl w-full object-cover h-[400px]"
              />
              <div className="absolute inset-0 rounded-2xl"></div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-teal-700 mb-6">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              At Sunny Shores, our mission is simple: to make every day feel
              like summer. We strive to deliver not just products but
              experiences that inspire joy, relaxation, and adventure.
            </p>
          </div>

          {/* Core Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Quality",
                icon: "🌟",
                desc: "Commitment to quality and sustainability",
              },
              {
                title: "Community",
                icon: "🤝",
                desc: "Empowering local communities and artisans",
              },
              {
                title: "Adventure",
                icon: "🏄‍♂️",
                desc: "Encouraging outdoor exploration",
              },
              {
                title: "Service",
                icon: "💫",
                desc: "Providing exceptional customer satisfaction",
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-teal-700 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* Closing Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-800 mb-6">
              Thank You for Choosing Sunny Shores!
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              We're excited to be part of your journey. Whether you're riding
              the waves or soaking up the sun, we hope our products bring you
              endless joy and inspiration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
