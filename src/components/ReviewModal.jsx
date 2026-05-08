import React, { useState, useEffect } from 'react';
import { useBooks } from '../providers/contextProvider';
import '../css/books.css';

const ReviewModal = ({ book, isOpen, onClose, editingReview }) => {
    const [formData, setFormData] = useState({
        reviewer: "",
        rating: "5",
        text: ""
    });
    const { addBookReview, updateReview } = useBooks();

    useEffect(() => {
        // Om modalen är öppen
        if (isOpen) {
            if (editingReview) {
                // Vi har en recension att ändra -> fyll i fältet med befintlig data
                setFormData({
                    reviewer: editingReview.reviewer || "",
                    rating: editingReview.rating || "5",
                    text: editingReview.text || ""
                });
            } else {
                // Vi ska lägga till en ny -> töm fälten
                setFormData({
                    reviewer: "",
                    rating: "5",
                    text: ""
                });
            }
        }
    }, [isOpen, editingReview]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingReview) {
            console.log("Uppdaterar befintlig recension");
            updateReview(book.id, editingReview.id, formData);
        } else {
            console.log("Skapar ny recension...");
            addBookReview(book.id, formData);
        }

        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Recension för {book?.volumeInfo?.title}</h3>

                <form onSubmit={handleSubmit} className="review-form">
                    <div className='name-container'>
                        <label>Ditt namn: </label>
                        <input
                            type="text"
                            value={formData.reviewer}
                            onChange={(e) => setFormData({ ...formData, reviewer: e.target.value })}
                            placeholder="Skriv ditt namn..."
                        />
                    </div>

                    <div className='rating-container'>
                        <label>Betyg: </label>
                        <select
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        >
                            <option value="1">1 - Dålig</option>
                            <option value="2">2 - Okej</option>
                            <option value="3">3 - Bra</option>
                            <option value="4">4 - Mycket bra</option>
                            <option value="5">5 - Mästerverk!</option>
                        </select>
                    </div>

                    <div className='text-container'>
                        <label>Din recension: </label>
                        <textarea
                            value={formData.text}
                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                            placeholder="Vad tyckte du om boken?"
                            rows="5"
                        />
                    </div>

                    <div className="modal-buttons">
                        <button type="button" className="review-btn" onClick={onClose}>
                            Avbryt
                        </button>
                        <button type="submit" className="review-btn">
                            Spara recension
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;