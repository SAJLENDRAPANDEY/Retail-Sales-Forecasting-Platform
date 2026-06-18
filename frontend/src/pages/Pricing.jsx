function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for students and beginners",
      features: [
        "1 Dataset Upload",
        "Basic Data Analysis",
        "Interactive Charts",
        "PDF Report Export",
        "Community Support",
      ],
      button: "Get Started",
    },
    {
      name: "Pro",
      price: "₹499",
      description: "Best for professionals and analysts",
      popular: true,
      features: [
        "Unlimited Dataset Uploads",
        "Advanced Dashboards",
        "AI-Powered Insights",
        "Forecasting Models",
        "Excel & PDF Reports",
        "Priority Support",
      ],
      button: "Start Pro Plan",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For businesses and organizations",
      features: [
        "Everything in Pro",
        "Team Collaboration",
        "Custom Analytics",
        "API Integration",
        "Dedicated Support",
        "Business Intelligence Suite",
      ],
      button: "Contact Us",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 20px",
        textAlign: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "15px",
        }}
      >
        Pricing Plans
      </h2>

      <p
        style={{
          maxWidth: "700px",
          margin: "0 auto 50px",
          color: "#64748b",
          fontSize: "1.1rem",
        }}
      >
        Choose the perfect plan for your analytics needs. Scale from
        individual learning to enterprise-grade business intelligence.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              width: "320px",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
              position: "relative",
              border: plan.popular
                ? "2px solid #2563eb"
                : "1px solid #e2e8f0",
            }}
          >
            {plan.popular && (
              <span
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#2563eb",
                  color: "#fff",
                  padding: "6px 15px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Most Popular
              </span>
            )}

            <h3>{plan.name}</h3>

            <h1
              style={{
                color: "#2563eb",
                margin: "15px 0",
              }}
            >
              {plan.price}
              {plan.price !== "Custom" && (
                <span
                  style={{
                    fontSize: "1rem",
                    color: "#64748b",
                  }}
                >
                  {" "}
                  / month
                </span>
              )}
            </h1>

            <p
              style={{
                color: "#64748b",
                marginBottom: "20px",
              }}
            >
              {plan.description}
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                textAlign: "left",
              }}
            >
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: "12px",
                  }}
                >
                  ✅ {feature}
                </li>
              ))}
            </ul>

            <button
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                background: "#2563eb",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;