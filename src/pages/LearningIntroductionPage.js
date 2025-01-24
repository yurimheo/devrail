// src/pages/LearningPage.js

import React from "react";
import { useNavigate } from "react-router-dom";

const LearningPage = () => {
  const navigate = useNavigate();

  const courses = [
    { name: "Docker 마스터 클래스", icon: "/assets/docker-icon.svg", id: "docker" },
    { name: "Kubernetes 완전정복", icon: "/assets/kubernetes-icon.svg", id: "kubernetes" },
    { name: "Ansible 기초", icon: "/assets/ansible-icon.svg", id: "ansible" },
    { name: "Jenkins 활용", icon: "/assets/jenkins-icon.svg", id: "jenkins" },
    { name: "ArgoCD 이해", icon: "/assets/argocd-icon.svg", id: "argocd" },
    { name: "Monitoring 기본", icon: "/assets/monitoring-icon.svg", id: "monitoring" },
  ];

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">학습 과정</h1>
      <div className="grid grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md cursor-pointer"
            onClick={() => handleCourseClick(course.id)}
          >
            <img src={course.icon} alt={`${course.name} icon`} className="w-16 h-16 mb-4" />
            <h2 className="text-lg font-semibold">{course.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
