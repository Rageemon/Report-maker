import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { createEvent, updateEvent } from "../actions/action"
import "./css/eventform.css";

function EventForm() {
    const location = useLocation()
    const navigate = useNavigate()

    const initialFormData = {
        eventName: "",
        date: "",
        venue: "",
        startTime: "",
        endTime: "",
        chiefGuest: "",
        imageFiles: [],
    };

    const Formdata = location.state || initialFormData
    console.log(Formdata)
    const [formData, setFormData] = useState(Formdata)
    const [selectedFont, setSelectedFont] = useState("Arial")
    const [selectedColor, setSelectedColor] = useState("#000000")

    useEffect(() => {
        if (!location.state) {
            setFormData(Formdata)
        }
        window.history.replaceState({}, document.title)
    }, [location.state]);

    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageFiles") {
            setFormData({ ...formData, imageFiles: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated !== "true") {
            alert("Please log in first to submit the event form.");
            return;
        }

        const newFormData = {
            ...formData,
            font: selectedFont,
            color: selectedColor,
        };

        try {
            if (formData._id) {
                const res = await updateEvent(formData._id, newFormData)
                console.log("if")
                if (res.success) {
                    console.log("Event updated:", res.data)
                    navigate("/report", { state: newFormData })
                } else {
                    console.error("Error updating event:", res.message)
                }
            } else {
                const res = await createEvent(newFormData);
                console.log("else")

                if (res.success) {
                    const createdFormData = { ...newFormData, _id: res.data._id }
                    navigate("/report", { state: createdFormData })
                } else {
                    console.error("Error creating event:", res.message)
                }
            }
        } catch (error) {
            console.error("Error submitting event:", error);
        }
    };

    return (
        <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
            <div className="wrapper wrapper--w790">
                <div className="card card-5">
                    <div className="card-heading">
                        <h2 className="title">Event Details Form</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="name">Event Name</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input
                                            className="input--style-5"
                                            type="text"
                                            name="eventName"
                                            value={formData.eventName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Date</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input
                                            className="input--style-5"
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Venue</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input
                                            className="input--style-5"
                                            type="text"
                                            name="venue"
                                            value={formData.venue}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row m-b-55">
                                <div className="name">Timing</div>
                                <div className="value">
                                    <div className="row row-space">
                                        <div className="col-2">
                                            <div className="input-group-desc">
                                                <input
                                                    className="input--style-5"
                                                    type="time"
                                                    name="startTime"
                                                    value={formData.startTime}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="label--desc">Start Time</label>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="input-group-desc">
                                                <input
                                                    className="input--style-5"
                                                    type="time"
                                                    name="endTime"
                                                    value={formData.endTime}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="label--desc">End Time</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Chief Guest</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input
                                            className="input--style-5"
                                            type="text"
                                            name="chiefGuest"
                                            value={formData.chiefGuest}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Image Upload</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input
                                            className="input--style-5"
                                            type="file"
                                            name="imageFiles"
                                            accept="image/*"
                                            multiple
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Select Font</div>
                                <div className="value">
                                    <div className="input-group">
                                        <select
                                            className="input--style-5"
                                            value={selectedFont}
                                            onChange={(e) => setSelectedFont(e.target.value)}
                                        >
                                            <option value="Arial">Arial</option>
                                            <option value="Courier New">Courier New</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Times New Roman">Times New Roman</option>
                                            <option value="Verdana">Verdana</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Select Text Color</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input
                                            type="color"
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn--radius-2 btn--red" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventForm;
