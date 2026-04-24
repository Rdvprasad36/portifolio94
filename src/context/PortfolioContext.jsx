import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Default data for static or fallback content
const defaultData = {
  profile: {
    name: "Durga Venkata Prasad Rapeti",
    role: "AI & Data Science Student @ JNTUK | Full Stack Developer",
    phone: "+91 73826 12327",
    email: "rdvprasad36@gmail.com",
    website: "rdvprasad36.dev",
    location: "Visakhapatnam, Andhra Pradesh",
    image: "/profile.jpg",
    summary: "AI & Data Science undergraduate (CGPA 9.38/10) with hands-on experience in machine learning, full-stack development, and AI applications. Built multiple hackathon projects including assistive technologies and productivity platforms. Experienced with Python, Next.js, and NLP-based systems, and passionate about building scalable AI solutions and real-world applications."
  },
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/durga-venkata-prasad-rapeti-b154022b7', icon: '🔗' },
    { name: 'GitHub', url: 'https://github.com/Rdvprasad36', icon: '💻' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/Rdv36', icon: '⚡' },
    { name: 'CodeChef', url: 'https://codechef.com/users/rdvprasad36', icon: '👨‍🍳' }
  ],
  education: [
    {
      id: 1,
      institution: "Vignan's Institute of Information Technology (VIIT), Duvvada",
      degree: "Bachelor of Technology in Artificial Intelligence and Data Science (Pursuing) | CGPA: 9.38/10.0",
      date: "Sep 2023 - Present",
      coursework: "Data Structures and Algorithms • Operating Systems and Networks • Database Management Systems • Software Engineering • AI • Machine Learning • Data science • Computer Networks"
    }
  ],
  skillsDetailed: {
    "Programming Languages": ["Python", "C", "C++", "Java", "Javascript"],
    "Machine Learning & AI": ["Machine Learning", "Deep Learning", "Natural Language Processing (NLP)", "Data Analysis", "Model Training", "Model Deployment"],
    "Frameworks & Libraries": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
    "Web Development": ["Next.js", "Node.js", "Express.js", "REST API Development", "HTML5", "CSS3"],
    "Cloud & Databases": ["Google Cloud Platform (GCP)", "Supabase", "SQL", "NoSQL", "Database Management Systems (DBMS)"],
    "Tools & DevOps": ["Git", "GitHub", "Docker", "Jupyter Notebook", "VS Code"],
    "AI & Automation Tools": ["LangChain", "n8n", "AI Workflow Automation"],
    "Platforms & Deployment": ["Vercel", "Netlify"],
    "Currently Exploring": ["Agentic AI", "Quantum Computing"]
  },
  recentActivities: [],
  experience: [],
  projects: [],
  achievements: []
};

const PortfolioContext = createContext();

export const usePortfolioInfo = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedTheme = localStorage.getItem('portfolioTheme');
    return { ...defaultData, theme: savedTheme || 'dark' };
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(data.theme || 'dark');

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAdmin(!!session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Fetch dynamic data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch conditionally, fallback to default if fails (e.g. Supabase not setup yet)
        const [projectsRes, experienceRes, activitiesRes, achievementsRes] = await Promise.all([
          supabase.from('projects').select('*').order('id', { ascending: true }).catch(() => ({ data: null })),
          supabase.from('experience').select('*').order('id', { ascending: true }).catch(() => ({ data: null })),
          supabase.from('activities').select('*').order('id', { ascending: true }).catch(() => ({ data: null })),
          supabase.from('achievements').select('*').order('id', { ascending: true }).catch(() => ({ data: null }))
        ]);

        setData(prev => ({
          ...prev,
          projects: projectsRes.data && projectsRes.data.length > 0 ? projectsRes.data : prev.projects,
          experience: experienceRes.data && experienceRes.data.length > 0 ? experienceRes.data : prev.experience,
          recentActivities: activitiesRes.data && activitiesRes.data.length > 0 ? activitiesRes.data : prev.recentActivities,
          achievements: achievementsRes.data && achievementsRes.data.length > 0 ? achievementsRes.data.map(a => a.content) : prev.achievements
        }));
      } catch (e) {
        console.error("Error fetching from Supabase, operating with fallback data.", e);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolioTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const login = async (email, password) => {
    // Basic fallback if empty credentials provided for local testing (remove in prod)
    if (email === 'Rdv36' && password === 'Rdv36') {
      setIsAdmin(true);
      return true;
    }
    
    // Proper Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      return false;
    }
    
    setIsAdmin(true);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const updateProfile = (key, value) => {
    setData(prev => ({ ...prev, profile: { ...prev.profile, [key]: value } }));
    // Future enhancement: Save profile to Supabase as well
  };

  const updateSection = (section, newValue) => {
    setData(prev => ({ ...prev, [section]: newValue }));
  };

  // --- Remote CRUD Operations ---

  const addProject = async (project, index = -1) => {
    // Optimistic update
    const newItem = { ...project, id: Date.now() }; // Temp ID
    setData(prev => {
      const arr = [...prev.projects];
      if (index === -1) arr.push(newItem);
      else arr.splice(index, 0, newItem);
      return { ...prev, projects: arr };
    });

    // Supabase insert
    const { data: inserted, error } = await supabase.from('projects').insert([{
      title: project.title,
      description: project.description,
      tech: project.tech,
      link: project.link
    }]).select().single();
    
    if (!error && inserted) {
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === newItem.id ? inserted : p)
      }));
    }
  };

  const deleteProject = async (id) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    await supabase.from('projects').delete().eq('id', id);
  };

  const addExperience = async (exp, index = -1) => {
    const newItem = { ...exp, id: Date.now() };
    setData(prev => {
      const arr = [...prev.experience];
      if (index === -1) arr.push(newItem);
      else arr.splice(index, 0, newItem);
      return { ...prev, experience: arr };
    });

    const { data: inserted, error } = await supabase.from('experience').insert([{
      role: exp.role,
      company: exp.company,
      date: exp.date,
      points: exp.points,
      tags: exp.tags
    }]).select().single();

    if (!error && inserted) {
      setData(prev => ({
        ...prev,
        experience: prev.experience.map(e => e.id === newItem.id ? inserted : e)
      }));
    }
  };

  const deleteExperience = async (id) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
    await supabase.from('experience').delete().eq('id', id);
  };

  const addAchievement = async (text, index = -1) => {
    setData(prev => {
      const arr = [...prev.achievements];
      if (index === -1) arr.push(text);
      else arr.splice(index, 0, text);
      return { ...prev, achievements: arr };
    });

    await supabase.from('achievements').insert([{ content: text }]);
  };

  const deleteAchievement = async (index) => {
    const achievementToDelete = data.achievements[index];
    setData(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
    
    // We try to match by content since array doesn't have IDs local side for achievements yet
    if (achievementToDelete) {
        await supabase.from('achievements').delete().eq('content', achievementToDelete);
    }
  };

  const addActivity = async (activity) => {
    const newItem = { ...activity, id: Date.now() };
    setData(prev => ({ ...prev, recentActivities: [newItem, ...prev.recentActivities] }));

    const { data: inserted, error } = await supabase.from('activities').insert([{
      title: activity.title,
      date: activity.date,
      content: activity.content
    }]).select().single();

    if (!error && inserted) {
      setData(prev => ({
        ...prev,
        recentActivities: prev.recentActivities.map(a => a.id === newItem.id ? inserted : a)
      }));
    }
  };

  const updateActivity = async (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      recentActivities: prev.recentActivities.map(a => a.id === id ? { ...a, ...updatedFields } : a)
    }));

    await supabase.from('activities').update(updatedFields).eq('id', id);
  };

  const deleteActivity = async (id) => {
    setData(prev => ({
      ...prev,
      recentActivities: prev.recentActivities.filter(a => a.id !== id)
    }));
    await supabase.from('activities').delete().eq('id', id);
  };

  return (
    <PortfolioContext.Provider value={{ 
      data, isAdmin, isLoading, login, logout, updateProfile, updateSection, 
      theme, toggleTheme, 
      addProject, deleteProject, 
      addExperience, deleteExperience,
      addAchievement, deleteAchievement,
      addActivity, updateActivity, deleteActivity
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
