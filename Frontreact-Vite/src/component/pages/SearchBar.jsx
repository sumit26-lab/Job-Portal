import React, { useState } from 'react';
import { Buttons } from './Buttons';

export const Filters = ({ setUsers, jobs }) => {
    const [state, setState] = useState(false);
    const [salary, setSalary] = useState(0);
    const [direc, setDirec] = useState(true);
    const [calculated, setCalculated] = useState(0);
    const searchQuery = localStorage.getItem('searchQuery');

    const handleClick = () => {
        setState(prev => !prev);
    };

    const filters = [
        'Date Posted',
        'Remote',
        'Education level',
        'Company',
        'Job Language',
        'Job Type'
    ];
    const dateItems = [
        'Last 10 days',
        'Last 15 days',
        'Last 8 days',
        'Last 4 days',
        'Last 3 days',
    ];
    const jtype = [
        'Part Time(5)',
        'Full Time(15)', 
        'Fresher(4)', 
        'Internship(10)'
    ];
    const remote = ['Work from home', 'On site'];
    const education = [
        "Bachelor's Degree(12)",
        '12th Pass(2)',
        "Master's Degree(1)",
        '10th Pass(2)',
    ];
    const company = [
        'Aivee', 'Trilia', 'Fadeo', 'Zoomzone', 'Mita', 'Yodel', 'Feedfish', 
        'Dazzlesphere', 'Twitterbridge', 'Yadel', 'Gigashots', 'Tazzy', 
        'Flashspan', 'Devpulse', 'Devbug', 'Topicstorm', 'Skyndu', 'Talane', 
        'Tekfly', 'Dabfeed', 'Skinder', 'Bubblebox', 'Kazio', 'Fiveclub', 
        'Twitternation', 'Mynte', 'Einti', 'Oyope', 'Twitterbeat', 'Jabberbean', 
        'Blogspan', 'Wikizz', 'Linktype', 'Buzzdog', 'Eazzy', 'Oyoba', 
        'Feedbug', 'Photolist', 'Tanoodle', 'InnoZ', 'Kare', 'Skyba', 
        'Fivespan', 'Tagpad', 'Babbleblab', 'Mydo', 'Buzzster', 'Yotz'
    ];
    const language = ['English', 'Hindi', 'Marathi'];

    const increase = (e) => {
        if (salary === 78300) {
            setDirec(!direc);
        }
        if (direc) {
            setCalculated(calculated + 1);
        } else {
            setCalculated(calculated - 1);
        }
    };

    return (
        <div className="p-4 bg-gray-100">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <form className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">What</label>
                        <input
                            id="job-title"
                            type="text"
                            placeholder="Accountant"
                            value={searchQuery || ''}
                            className="border border-gray-300 p-2 rounded-lg w-full mt-1"
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Where</label>
                        <input
                            id="location"
                            type="text"
                            placeholder="Noida, Uttar Pradesh"
                            className="border border-gray-300 p-2 rounded-lg w-full mt-1"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            Find Jobs
                        </button>
                        <span className="ml-4 text-blue-600 cursor-pointer hover:underline">Advanced Job Search</span>
                    </div>
                </form>

                </div>
                </div>
    );
};
