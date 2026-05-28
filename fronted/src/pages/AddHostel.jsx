import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaCheckCircle } from 'react-icons/fa';
import { createHostel } from '../services/api';
import AdminLayout from '../components/AdminLayout';
import './AddHostel.css';

const AddHostel = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    price: '',
    capacity: '',
    amenities: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert('You can only upload up to 5 images');
      return;
    }

    setImages([...images, ...files]);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('capacity', formData.capacity);
    
    const amenitiesArray = formData.amenities.split(',').map(a => a.trim()).filter(a => a);
    formDataToSend.append('amenities', JSON.stringify(amenitiesArray));

    // Append images
    images.forEach(image => {
      formDataToSend.append('images', image);
    });

    const result = await createHostel(formDataToSend);
    setLoading(false);
    
    if (result._id) {
      setMessage('Hostel added successfully!');
      setTimeout(() => navigate('/admin/applications'), 2000);
    } else {
      setMessage(result.message || 'Failed to add hostel');
    }
  };

  return (
    <AdminLayout>
      <div className="add-hostel-container">
        <div className="add-hostel-card">
        <h2>Add New Hostel</h2>
        {message && <div className="message"><FaCheckCircle /> {message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Hostel Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Price per month"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={(e) => setFormData({...formData, capacity: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Amenities (comma separated)"
            value={formData.amenities}
            onChange={(e) => setFormData({...formData, amenities: e.target.value})}
          />
          
          <div className="image-upload-section">
            <label htmlFor="images" className="image-upload-label">
              <FaImage /> Upload Images (Max 5)
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            
            {imagePreviews.length > 0 && (
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Adding Hostel...' : 'Add Hostel'}
          </button>
        </form>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AddHostel;
