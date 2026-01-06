import type { DietaryTags as DietaryTagsType } from '../types/supplement';

interface DietaryTagsProps {
  tags: DietaryTagsType;
}

function DietaryTags({ tags }: DietaryTagsProps) {
  const activeTags = [
    { label: 'Vegan', active: tags.vegan, emoji: '🌱' },
    { label: 'Vegetarian', active: tags.vegetarian, emoji: '🥬' },
    { label: 'Gluten-Free', active: tags.glutenFree, emoji: '🌾' },
    { label: 'Organic', active: tags.organic, emoji: '🌿' },
  ].filter(tag => tag.active);

  if (activeTags.length === 0) return null;

  return (
    <div className="dietary-tags">
      {activeTags.map(tag => (
        <span key={tag.label} className="dietary-tag">
          <span className="tag-emoji" aria-hidden="true">{tag.emoji}</span>
          {tag.label}
        </span>
      ))}
    </div>
  );
}

export default DietaryTags;
