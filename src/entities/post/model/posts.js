export const posts = [
  {
    id: "quantum-leap",
    type: "blog",
    showOnHome: true,

    title: "The Quantum Leap in Computing",
    description:
      "Explore the revolution in quantum computing, its applications, and its potential impact on various industries.",

    image: "/images/blog/1.png",
    href: "/blog/quantum-leap",

    author: {
      name: "John Techson",
      image: "/images/blog/1.png",
    },
     bannerImage: "/images/blog-details/bg.jpg",

    category: {
      label: "Quantum Computing",
      value: "quantum-computing",
    },

    date: "2023-10-15",
    readingTime: "10 Min",

    stats: {
      likes: "32k",
      views: "50k",
      shares: 20,
    },

    content: {
      introduction:
        "Quantum computing represents one of the most significant technological shifts of our time. Unlike classical computers, which process information using bits, quantum computers rely on qubits that can represent multiple states at once.",

      sections: [
        {
          title: "What Makes Quantum Computing Different",
          paragraphs: [
            "Traditional computers solve problems step by step using binary logic. Quantum computers use principles such as superposition and entanglement, allowing them to process certain types of problems in a radically different way.",
            "This does not mean quantum computers will replace everyday devices, but they may become powerful tools for solving highly complex tasks in science, security, medicine, and logistics.",
          ],
        },
        {
          title: "Potential Applications Across Industries",
          paragraphs: [
            "Quantum computing could accelerate drug discovery, improve financial modeling, strengthen material science research, and optimize supply chains.",
            "Although the technology is still developing, companies and researchers are already exploring how quantum algorithms could solve problems that are currently too large for classical systems.",
          ],
        },
      ],
    },
  },

  {
    id: "ai-healthcare",
    type: "news",
    showOnHome: true,

    title: "The Rise of Artificial Intelligence in Healthcare",
    description:
      "Artificial Intelligence is reshaping patient care, diagnostics, research, and disease prevention across the healthcare industry.",

    image: "/images/blog/2.png",
    href: "/news/ai-healthcare",

    author: {
      name: "Dr. Emily Walker",
      image: "/images/blog/2.png",
    },

    category: {
      label: "Healthcare",
      value: "healthcare",
    },

    date: "2023-12-20",
    readingTime: "10 Min",

    stats: {
      likes: "24.5k",
      views: "50k",
      shares: 206,
    },

    content: {
      introduction:
        "Artificial Intelligence has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research. In this post, we explore the profound impact AI has on healthcare, from revolutionizing diagnostic accuracy to enhancing patient outcomes.",

      sections: [
        {
          title: "Artificial Intelligence (AI)",
          paragraphs: [
            "Artificial Intelligence has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals.",
            "AI in healthcare is setting new standards for patient care and treatment. From diagnostic imaging to personalized treatment plans, AI addresses the critical considerations surrounding this revolutionary technology.",
          ],
        },
        {
          title: "Predictive Analytics and Disease Prevention",
          paragraphs: [
            "One of the most prominent applications of AI in healthcare is predictive analytics. AI algorithms can analyze large volumes of medical data and identify patterns that may help detect risks earlier.",
            "This can support doctors in making better-informed decisions and may contribute to earlier diagnosis, improved prevention strategies, and more personalized patient care.",
          ],
        },
        {
          title: "Personalized Treatment Plans",
          paragraphs: [
            "AI-powered systems can help create individualized treatment plans by analyzing patient history, symptoms, test results, and other medical data.",
            "This approach allows healthcare providers to move away from one-size-fits-all methods and focus on treatment strategies that better match each patient’s needs.",
          ],
        },
      ],
    },
  },

  {
    id: "robotics-manufacturing",
    type: "blog",
    showOnHome: true,

    title: "The Future of Robotics in Manufacturing",
    description:
      "Discover how robotics is changing modern manufacturing through automation, precision, and intelligent production systems.",

    image: "/images/blog/3.png",
    href: "/blog/robotics-manufacturing",

    author: {
      name: "Michael Stone",
      image: "/images/blog/3.png",
    },

    category: {
      label: "Robotics",
      value: "robotics",
    },

    date: "2023-11-08",
    readingTime: "8 Min",

    stats: {
      likes: "18k",
      views: "37k",
      shares: 85,
    },

    content: {
      introduction:
        "Robotics is becoming a central part of modern manufacturing. From assembly lines to quality control, intelligent machines are helping companies improve efficiency, reduce errors, and scale production.",

      sections: [
        {
          title: "Automation and Precision",
          paragraphs: [
            "Robotic systems can perform repetitive tasks with a high level of accuracy, making them especially valuable in industries where precision is critical.",
            "By automating routine operations, manufacturers can reduce production delays and allow human workers to focus on supervision, design, maintenance, and process improvement.",
          ],
        },
        {
          title: "Smart Factories",
          paragraphs: [
            "The combination of robotics, sensors, and data analytics is giving rise to smart factories where machines can communicate, adapt, and optimize workflows.",
            "These systems can help detect issues earlier, improve resource usage, and make production lines more flexible.",
          ],
        },
      ],
    },
  },

  {
    id: "cybersecurity-trends",
    type: "news",
    showOnHome: false,

    title: "Cybersecurity Trends Businesses Should Watch",
    description:
      "A look at emerging cybersecurity challenges and the strategies companies are using to protect digital infrastructure.",

    image: "/images/blog/4.png",
    href: "/news/cybersecurity-trends",

    author: {
      name: "Sophia Carter",
      image: "/images/blog/4.png",
    },

    category: {
      label: "Cybersecurity",
      value: "cybersecurity",
    },

    date: "2024-01-12",
    readingTime: "7 Min",

    stats: {
      likes: "12.8k",
      views: "29k",
      shares: 64,
    },

    content: {
      introduction:
        "Cybersecurity continues to be one of the most important priorities for businesses as digital systems become more connected and complex.",

      sections: [
        {
          title: "Growing Security Risks",
          paragraphs: [
            "Companies are facing increasingly sophisticated attacks, including phishing, ransomware, data breaches, and supply chain vulnerabilities.",
            "As more business operations move to cloud platforms and remote environments, organizations need stronger security strategies and better monitoring tools.",
          ],
        },
        {
          title: "Building a Stronger Defense",
          paragraphs: [
            "Modern cybersecurity requires a combination of employee training, access control, data protection, system monitoring, and incident response planning.",
            "Businesses that invest in proactive security are better prepared to prevent attacks and respond quickly when threats appear.",
          ],
        },
      ],
    },
  },
]


export const getPostById = (id) => {
    return posts.find((post) => post.id === id )

}