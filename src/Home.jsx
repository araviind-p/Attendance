import React, { useState } from "react";

function Home() {
  const [students, setStudents] = useState(0);
  const [absent, setAbsent] = useState([]);

  const handleSvgClick = (studentIndex) => {
    if (absent.includes(studentIndex)) {
      // Student is already absent, so remove them
      setAbsent(
        absent.filter((absentStudent) => absentStudent !== studentIndex)
      );
    } else {
      // Student is present, so mark them as absent
      setAbsent([...absent, studentIndex]);
    }
  };

  const sharetoWhatsapp = () => {
    // Get the current date and time
    const currentDate = new Date();

    // Format the date and time in "dd/mm/yy" format
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
    const year = String(currentDate.getFullYear()).slice(2);

    const formattedDateTime = `${day}/${month}/${year} ${currentDate.toLocaleTimeString()}`;

    // Create a message with attendance details, including the formatted date and time
    let message = `${formattedDateTime}\nAbsent Students\n\n`;

    for (const student of absent) {
      message += `${student}  `;
    }

    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);

    // Create the WhatsApp sharing link
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

    // Open the link in a new tab
    window.open(whatsappURL);
  };

  const isAbsent = (studentIndex) => absent.includes(studentIndex);

  const generateArray = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        className="bi bi-square"
        viewBox="0 0 16 16"
        style={{ padding: "10px" }}
        key={index}
        onClick={() => handleSvgClick(index + 1)}
      >
        <rect
          x="1"
          y="1"
          width="14"
          height="14"
          fill="#f0fcf3"
          stroke={isAbsent(index + 1) ? "red" : "green"}
          strokeWidth="1"
          rx="1"
        />
        <text
          x="8"
          y="8"
          textAnchor="middle"
          dy=".3em"
          fontSize="12"
          fill="black"
        >
          {index + 1}
        </text>
      </svg>
    ));
  };

  return (
    <div>
      <h1 style={{ color: "#610C9F" }}>ATTENDANCE</h1>
      <h2 style={{ color: "#940B92" }}>Enter the total number of students</h2>
      <input
        type="number"
        onChange={(e) => {
          setStudents(e.target.value);
          // Reset absent students when the number of students changes
          setAbsent([]);
        }}
      />
      <br />
      <br />
      {generateArray(students)}
      <h3 style={{ color: "#9A4444" }}>
        Absent Students: {absent.sort((a, b) => a - b).join(", ")}
      </h3>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="currentColor"
        class="bi bi-whatsapp"
        viewBox="0 0 16 16"
        onClick={sharetoWhatsapp}
      >
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
      </svg>
    </div>
  );
}

export default Home;
