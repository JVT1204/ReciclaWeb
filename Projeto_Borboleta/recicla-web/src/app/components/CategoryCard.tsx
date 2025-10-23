import React from 'react';

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, description, color }) => {
  return (
    <div 
      className="category"
      style={{ borderColor: color }}
    >
      <div className="categoryIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CategoryCard;
