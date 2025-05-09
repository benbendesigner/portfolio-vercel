import React from 'react';

interface ProjectListItemProps {
  title: string;
  year: string;
  role: string;
  company: string;
  description: string;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ title, year, role, company, description }) => {
  return (
    <div className="py-6 border-b border-gray-800 grid grid-cols-1 md:grid-cols-12 gap-4 transition-all duration-300 hover:bg-gray-900/30 hover:px-2 cursor-pointer group items-center">
      <div className="md:col-span-3 font-heading text-[22px] font-semibold transition-colors duration-200 group-hover:text-white flex items-center">{title}</div>
      <div className="md:col-span-1 text-xs italic text-gray-400 font-body transition-colors duration-200 group-hover:text-gray-300 flex items-center">{company}</div>
      <div className="md:col-span-1 text-xs font-medium text-gray-400 font-body transition-colors duration-200 group-hover:text-white flex items-center">{year}</div>
      <div className="md:col-span-2 text-xs italic text-gray-400 font-body transition-colors duration-200 group-hover:text-gray-300 flex items-center">{role}</div>
      <div className="md:col-span-5 text-xs italic text-gray-400 font-body transition-colors duration-200 group-hover:text-gray-300 flex items-center">
        {description}
      </div>
    </div>
  );
};

export default ProjectListItem; 