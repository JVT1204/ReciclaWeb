'use client';

import { TrashType } from '../types';

interface CategoryCardProps {
  trashType: TrashType;
  isActive: boolean;
}

export default function CategoryCard({ trashType, isActive }: CategoryCardProps) {
  return (
    <div className={`lixo-card ${trashType.id}${isActive ? ' active' : ''}`}>
      <div className={`lixo-icon ${trashType.id}`}>
        {trashType.icon}
      </div>
      <h3 className="lixo-title" style={{ color: trashType.color }}>
        {trashType.title}
      </h3>
      <p className="lixo-description">
        {trashType.description}
      </p>
      <div className="lixo-tip">
        {trashType.tip}
      </div>
    </div>
  );
}