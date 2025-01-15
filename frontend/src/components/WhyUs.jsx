import React from "react";

const WhyUs = () => {
  const features = [
    {
      icon: "🏄‍♂️",
      title: "Industry Expertise",
      description: "Over 10 years of surf industry experience",
    },
    {
      icon: "👥",
      title: "Dedicated Team",
      description:
        "A team of passionate surfers and beach lovers who understand quality",
    },
    {
      icon: "🌱",
      title: "Eco-Friendly",
      description:
        "Environmentally-conscious products and sustainable packaging",
    },
    {
      icon: "🚚",
      title: "Fast Shipping",
      description: "Fast & free shipping on orders over $75",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Round-the-clock customer support and easy returns",
    },
    {
      icon: "🤝",
      title: "Community First",
      description:
        "Supporting local surf communities and beach cleanup initiatives",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-teal">Sunny Shores</span>?
          </h2>
          <div className="w-24 h-1 bg-teal mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg ">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
