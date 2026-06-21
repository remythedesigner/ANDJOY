import ReviewCard from '../molecules/ReviewCard';
import { ASSETS, communityMembers, communityReviews } from '../../utils/data';

interface CommunitySectionProps {
  onEventClick?: () => void;
}

export default function CommunitySection({ onEventClick }: CommunitySectionProps) {
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
          <div key={member.id} className="flex flex-col items-center gap-2">
            <div
              className="rounded-[24px] p-[2.5px] size-[52px] shrink-0"
              style={{ background: member.gradient }}
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
          </div>
        ))}
      </div>

      {/* Review cards horizontal scroll */}
      <div
        className="flex gap-4 pl-6 pr-6 pt-4 pb-5 -mb-5 mt-4 overflow-x-auto scrollbar-hide"
        role="list"
        aria-label="Avis de la communauté"
      >
        {communityReviews.map((review) => (
          <div key={review.id} role="listitem">
            <ReviewCard review={review} onEventClick={onEventClick} />
          </div>
        ))}
      </div>
    </section>
  );
}
