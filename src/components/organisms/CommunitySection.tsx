import { useState } from 'react';
import ReviewCard from '../molecules/ReviewCard';
import MemberProfileSheet from './MemberProfileSheet';
import { ASSETS, communityMembers, communityReviews } from '../../utils/data';
import type { CommunityMember } from '../../utils/types';

interface CommunitySectionProps {
  onEventClick?: () => void;
}

export default function CommunitySection({ onEventClick }: CommunitySectionProps) {
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);

  return (
    <section className="flex flex-col py-6" aria-label="La communauté">
      {/* Section header */}
      <div className="flex items-center gap-2 px-6">
        <img src={ASSETS.icons.heart} alt="" aria-hidden="true" className="w-[15px] h-[15px] object-contain" />
        <h2 className="typo-h3 text-dark">La communauté</h2>
      </div>

      {/* Member avatars */}
      <div className="flex items-start justify-between px-6 mt-5" aria-label="Membres actifs">
        {communityMembers.map((member) => (
          <button
            key={member.id}
            className="flex flex-col items-center gap-2 active:opacity-70 transition-opacity focus-visible:outline-none"
            onClick={() => setSelectedMember(member)}
            aria-label={`Voir le profil de ${member.name}`}
          >
            <div
              className="rounded-[24px] p-[2.5px] size-[52px] shrink-0"
              style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, rgba(139,92,246,0.25) 100%)' }}
            >
              <div className="border-[2.5px] border-white rounded-full w-full h-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <span className="font-sans font-semibold text-[11px] text-muted leading-tight text-center">
              {member.name}
            </span>
          </button>
        ))}
      </div>

      {/* Review cards horizontal scroll */}
      <div
        className="flex gap-4 pl-6 pr-6 pt-4 pb-5 -mb-5 mt-4 overflow-x-auto scrollbar-hide"
        role="list"
        aria-label="Avis de la communauté"
      >
        {communityReviews.slice(0, 5).map((review) => (
          <div key={review.id} role="listitem">
            <ReviewCard
              review={review}
              onEventClick={onEventClick}
              onAuthorClick={() => {
                const member = communityMembers.find(m => m.name === review.author);
                if (member) setSelectedMember(member);
              }}
            />
          </div>
        ))}
      </div>

      {selectedMember && (
        <MemberProfileSheet
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onEventClick={onEventClick}
        />
      )}
    </section>
  );
}
