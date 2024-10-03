import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import jsPDF from "jspdf";
import { deleteEvent } from "../actions/action"
import "../components/css/report.css"
import Header from "../components/header"


function EventReport() {
    const location = useLocation()
    const formData = location.state
    const navigate = useNavigate()
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        });
    };

    const generatePDF = async () => {
        const doc = new jsPDF();

        doc.setFont(formData.font); 
        doc.setTextColor(formData.color);

  
        doc.setFontSize(40);
        doc.text("Event Report", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" })


        doc.setFontSize(16);
        doc.text(`Event Name: ${formData.eventName}`, 20, 40)
        doc.text(`Date: ${formData.date}`, 20, 50)
        doc.text(`Venue: ${formData.venue}`, 20, 60)
        doc.text(`Timing: ${formData.startTime} - ${formData.endTime}`, 20, 70)
        doc.text(`Chief Guest: ${formData.chiefGuest}`, 20, 80)


        if (formData.imageFiles && formData.imageFiles.length > 0) {
            let yOffset = 90;
            for (let i = 0; i < formData.imageFiles.length; i++) {
                const imageFile = formData.imageFiles[i]
                const base64Image = await getBase64(imageFile)
                doc.addImage(base64Image, "JPEG", 20, yOffset, 100, 60);
                yOffset += 80; 
            }
        }

        doc.save("event-report.pdf");
    };

    const handleUpdate = async () => {
        navigate("/", { state: formData })
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this event?");
        if (confirmed) {
            try {
                const response = await deleteEvent(formData._id);
                if (response.success) {
                    alert("Event deleted successfully!");
                    navigate("/");
                } else {
                    alert(`Failed to delete event: ${response.message}`)
                }
            } catch (error) {
                console.error("Error deleting event:", error)
                alert("An error occurred while deleting the event.")
            }
        }
    };

    return (
        <div className="container">
            <Header/>
            <div className="event-report-container">
                <div className="event-report">
                    <header className="event-header" style={{ fontFamily: formData.font, color: formData.color }}>
                        <h1>Event Report</h1>
                    </header>

                    <section className="event-details">
                        <div className="event-info-column">
                            <p><strong>Event Name:</strong> {formData.eventName}</p>
                            <p><strong>Date:</strong> {formData.date}</p>
                            <p><strong>Venue:</strong> {formData.venue}</p>
                            <p><strong>Timing:</strong> {formData.startTime} - {formData.endTime}</p>
                            <p><strong>Chief Guest:</strong> {formData.chiefGuest}</p>
                            {formData.imageFiles && formData.imageFiles.length > 0 && (
                                <div>
                                    <p><strong>Event Images:</strong></p>
                                    <div>
                                        {Array.from(formData.imageFiles).map((file, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(file)}
                                                alt={`Event ${index + 1}`}
                                                style={{ maxWidth: "300px", height: "auto", marginBottom: "10px" }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <div className="event-actions">
                <button className="btn btn--radius-2 btn--green" onClick={generatePDF}>
                    Generate PDF
                </button>
                <button className="btn btn--radius-2 btn--blue" onClick={handleUpdate}>
                    Update
                </button>
                <button className="btn btn--radius-2 btn--red" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default EventReport;
