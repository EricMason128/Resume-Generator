import React, { useState, useEffect } from 'react';
import ProfileList from "../components/profileList";
import ProfileForm from '../components/profileForm';
import ResumeGenerator from '../components/resumegenerator';
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile
} from '../api';

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchProfiles = async () => {
    const res = await getProfiles();
    setProfiles(res.data);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSave = async (profile) => {
    if (isCreating) {
      await createProfile(profile);
    } else {
      console.log(selectedProfile);
      await updateProfile(selectedProfile._id, profile);
    }
    setSelectedProfile(null);
    setIsCreating(false);
    fetchProfiles();
  };

  const handleDeleteProfile = async (id) => {
    await deleteProfile(id);
    fetchProfiles();
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingTop: 40 }}>
      {selectedProfile || isCreating ? (
        <ProfileForm
          initialData={selectedProfile || {}}
          onBack={() => {
            setSelectedProfile(null);
            setIsCreating(false);
          }}
          onSubmit={handleSave}
        />
      ) : (
        <ProfileList
          profiles={profiles}
          onViewProfile={(p) => setSelectedProfile(p)}
          onCreateProfile={() => setIsCreating(true)}
          onDeleteProfile={handleDeleteProfile}
        />
      )}
      <ResumeGenerator profiles={profiles} />
    </div>
  );
};

export default Profile;
