import React, {useState} from 'react';
import './styles.css'
import axios from 'axios';

const PostJobs = () => {
    const [formData, setFormData] = useState({
        company_img: '',
        title: '',
        company: '',
        location: '',
        sponsor: '',
        visa: '',
        type: '',
        level: '',
        description: '',
        requirements: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const fileChangedHandler = (e) => {
        this.setState({selectedFile: e.target.files[0]});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8082/api/jobs', formData);
            alert('Job submitted successfully!');
            setFormData({
                company_img: '',
                title: '',
                company: '',
                location: '',
                sponsor: '',
                visa: '',
                type: '',
                level: '',
                description: '',
                requirements: ''
            });
        } catch (err) {
            alert('Failed to submit job!');
        }
    };
    return (
        <form className="formContainer" onSubmit={handleSubmit}>
            <h2 className="formHead">Find Your Ideal Talents at BoLe!</h2>
            <div className="form-detail">
                <div className="form-label">
                    <label className="company_img">Company Logo: </label>
                    <div>
                        <input
                            name="img"
                            onChange={fileChangedHandler}
                            type="file"
                            style={{width: "100%"}}
                        ></input>
                    </div>
                </div>
                <br/>
                <div className="form-group">
                    <label className="title">Job Title: </label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="company">Company Name: </label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="location">Location: </label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="sponsor">Sponsor: </label>
                    <input type="text" name="sponsor" value={formData.sponsor} onChange={handleChange} required/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="visa">Accepted work visas: </label>
                    <input type="text" name="visa" value={formData.visa} onChange={handleChange}/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="type">Job Type: </label>
                    <input type="text" name="type" value={formData.type} onChange={handleChange} required/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="level">Job Level: </label>
                    <input type="text" name="level" value={formData.level} onChange={handleChange} required/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="description">Job Description: </label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="requirements">Job Requirements: </label>
                    <textarea name="requirements" value={formData.requirements} onChange={handleChange} required/>
                </div>
            </div>
            <button className="btn-submit" type="submit">Submit</button>
        </form>
    );
};

export default PostJobs;
