document.addEventListener("DOMContentLoaded", () => {
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check on load
});



 const faqs = [
      {
        question: "Do I need permits to visit Sikkim?",
        answer: "Indian citizens need Inner Line Permit (ILP) for protected areas. Foreign nationals need Protected Area Permit (PAP) and Restricted Area Permit (RAP)."
      },
      {
        question: "What is the best time to visit Sikkim?",
        answer: "March to June for pleasant weather and clear mountain views. September to December for post-monsoon clarity. Winter (Dec-Feb) for snow experiences."
      },
      {
        question: "How do I reach Sikkim?",
        answer: "Nearest airport: Bagdogra (124 km). Nearest railway: New Jalpaiguri. Regular taxi and bus services available from both."
      },
      {
        question: "Is Sikkim safe for solo travelers?",
        answer: "Yes, Sikkim is very safe for solo travelers including women. The local people are friendly and helpful."
      },
      {
        question: "What should I pack for Sikkim trip?",
        answer: "Warm clothes, comfortable walking shoes, rain gear, sunscreen, personal medications, and valid ID proofs."
      },
      {
        question: "Can I use my mobile phone in Sikkim?",
        answer: "Yes, most areas have good network coverage. BSNL and Airtel work well. Jio has limited coverage in some areas."
      }
    ];

    const faqContainer = document.getElementById("faq-container");
faqs.forEach(faq => {
      const item = document.createElement("div");
      item.classList.add("faq-item");

      item.innerHTML = `
        <button class="faq-question">
          ${faq.question}
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      `;

      faqContainer.appendChild(item);

      const btn = item.querySelector(".faq-question");
      btn.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });

  // Fade in when page loads
  

 
 