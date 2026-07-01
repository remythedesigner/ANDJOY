import { useState, useEffect, useRef } from 'react';
import ReviewCard from '../molecules/ReviewCard';
import { communityReviews } from '../../utils/data';
import type { CommunityMember } from '../../utils/types';

interface MemberProfileSheetProps {
  member: CommunityMember;
  onClose: () => void;
  onEventClick?: () => void;
}

export default function MemberProfileSheet({ member, onClose, onEventClick }: MemberProfileSheetProps) {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const reviews = communityReviews.filter(r => r.author === member.name).slice(0, 5);

  const CLOSE_THRESHOLD = 120;

  // Lock body scroll when sheet is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStartY(e.touches[0].clientY);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;

    // Allow dragging up or down, but clamp to >= 0
    setDragOffset(Math.max(0, diff));
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartY === null) return;

    // If dragged down more than threshold, close the sheet
    if (dragOffset > CLOSE_THRESHOLD) {
      onClose();
    } else {
      // Snap back to original position
      setDragOffset(0);
    }
    setTouchStartY(null);
  }

  // Calculate overlay opacity based on drag offset
  // Minimum opacity is 0.15 to keep overlay visible while sheet exists
  const overlayOpacity = Math.max(0.15, 0.35 - (dragOffset / CLOSE_THRESHOLD) * 0.35);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{ background: `rgba(0,0,0,${overlayOpacity})`, transition: dragOffset === 0 ? 'background 0.3s ease' : 'none' }}
      onClick={onClose}
    >
      <div
        ref={sheetRef}
        className="bg-[#faf4f1] rounded-t-[32px] pt-4 pb-10 flex flex-col overflow-hidden max-h-[88svh]"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${dragOffset}px)`,
          transition: dragOffset === 0 ? 'transform 0.3s ease' : 'none',
        }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-black/10 mx-auto mb-5 shrink-0 cursor-grab active:cursor-grabbing" />

        {/* Header */}
        <div className="flex flex-col items-center px-6 pb-5 shrink-0">
          <div className="rounded-full size-[72px] mb-3 overflow-hidden">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="font-sans font-extrabold text-[20px] text-dark">{member.name}</h2>
          <p className="font-sans font-medium text-[13px] text-[#8B5CF6] mt-0.5">
            {member.gender === 'female' ? 'Rédactrice' : 'Rédacteur'} &JOY
          </p>
          <p className="font-sans text-[13px] text-muted mt-1 text-center leading-[1.5] max-w-[260px]">{member.bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {member.tags.map(tag => (
              <span
                key={tag}
                className="px-3 h-7 flex items-center rounded-full bg-white font-sans font-semibold text-[12px] text-dark shadow-[0px_1px_4px_rgba(0,0,0,0.06)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews carousel */}
        {reviews.length > 0 && (
          <>
            <div className="h-px bg-black/[0.06] mx-6 mb-4 shrink-0" />
            <p className="font-sans font-bold text-[12px] text-muted uppercase tracking-widest px-6 mb-3 shrink-0">
              Derniers avis
            </p>
            <div className="flex gap-4 pl-6 pr-6 pb-2 overflow-x-auto scrollbar-hide shrink-0">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} onEventClick={() => { onClose(); onEventClick?.(); }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
