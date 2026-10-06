import React from 'react';
import { AvatarId } from '../types';

interface CharacterSpriteProps {
  id: AvatarId | 'ketua' | 'nelayan' | 'doktor' | 'anis' | 'salmah' | 'burhan';
  direction?: 'up' | 'down' | 'left' | 'right';
  hasMask?: boolean;
  isMoving?: boolean;
  size?: number;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  id,
  direction = 'down',
  hasMask = false,
  isMoving = false,
  size = 52,
}) => {
  // Harvest Moon / Stardew Valley 24x24 pixel grid styling
  const isUp = direction === 'up';
  const isSide = direction === 'left' || direction === 'right';
  const walkBounce = isMoving ? 'translate-y-[-1px]' : '';
  const legShift = isMoving ? 'translate-x-[0.5px]' : '';

  // Render detailed Harvest Moon style heads
  const renderHead = () => {
    switch (id) {
      case 'adam':
        // Harvest Moon boy hero: Blue farmer cap, layered brown hair bangs, big expressive eyes with glint, rosy blush
        if (isUp) {
          return (
            <g>
              {/* Back of blue cap */}
              <rect x="7" y="3" width="10" height="5" fill="#0284c7" />
              <rect x="6" y="5" width="12" height="4" fill="#0369a1" />
              {/* Hair strands sticking out below cap */}
              <rect x="7" y="9" width="10" height="3" fill="#78350f" />
              <rect x="6" y="10" width="3" height="3" fill="#92400e" />
              <rect x="15" y="10" width="3" height="3" fill="#92400e" />
            </g>
          );
        }
        return (
          <g>
            {/* Cap button & crown */}
            <rect x="11" y="2" width="2" height="1" fill="#facc15" />
            <rect x="7" y="3" width="10" height="4" fill="#0284c7" />
            <rect x="6" y="4" width="12" height="3" fill="#0284c7" />
            {/* Red cap brim / visor turned slightly */}
            <rect x="5" y="6" width="14" height="2" fill="#dc2626" />
            <rect x="7" y="7" width="10" height="1" fill="#b91c1c" />

            {/* Messy anime hair bangs */}
            <rect x="6" y="8" width="12" height="2" fill="#78350f" />
            <rect x="8" y="9" width="2" height="2" fill="#92400e" />
            <rect x="12" y="9" width="2" height="2" fill="#92400e" />
            <rect x="15" y="8" width="2" height="3" fill="#78350f" />
            <rect x="5" y="8" width="2" height="3" fill="#78350f" />

            {/* Clean peach skin face */}
            <rect x="7" y="9" width="10" height="6" fill="#fed7aa" />
            <rect x="8" y="15" width="8" height="1" fill="#fdba74" />

            {/* Cute big anime chibi eyes with white shine */}
            {!isSide ? (
              <>
                {/* Left eye */}
                <rect x="8" y="11" width="2" height="3" fill="#0f172a" />
                <rect x="8" y="11" width="1" height="1" fill="#ffffff" />
                {/* Right eye */}
                <rect x="14" y="11" width="2" height="3" fill="#0f172a" />
                <rect x="14" y="11" width="1" height="1" fill="#ffffff" />
                {/* Cheerful blush */}
                <rect x="7" y="13" width="2" height="1" fill="#fca5a5" />
                <rect x="15" y="13" width="2" height="1" fill="#fca5a5" />
                {/* Cute smile */}
                {!hasMask && <rect x="11" y="13.5" width="2" height="1" fill="#9a3412" />}
              </>
            ) : (
              <>
                {/* Profile single eye */}
                <rect x="12" y="11" width="2" height="3" fill="#0f172a" />
                <rect x="12" y="11" width="1" height="1" fill="#ffffff" />
                <rect x="13" y="13" width="2" height="1" fill="#fca5a5" />
              </>
            )}

            {/* Protective surgical mask when equipped */}
            {hasMask && (
              <g>
                <rect x="8" y="12.5" width="8" height="3.5" fill="#e0f2fe" rx="0.5" />
                <rect x="9" y="13.5" width="6" height="1.5" fill="#38bdf8" opacity="0.6" />
                <rect x="7" y="13.5" width="1" height="1" fill="#cbd5e1" />
                <rect x="16" y="13.5" width="1" height="1" fill="#cbd5e1" />
              </g>
            )}
          </g>
        );

      case 'hawa':
        // Harvest Moon girl hero: Cute adventurer headscarf / ponytail with flower, big sparkling eyes, rosy blush
        if (isUp) {
          return (
            <g>
              <rect x="6" y="3" width="12" height="10" fill="#ec4899" rx="1" />
              <rect x="7" y="4" width="10" height="8" fill="#db2777" />
              {/* Headscarf fold knot */}
              <circle cx="12" cy="11" r="2" fill="#be185d" />
            </g>
          );
        }
        return (
          <g>
            {/* Cute pink headscarf / hair band */}
            <rect x="6" y="3" width="12" height="7" fill="#ec4899" rx="1" />
            <rect x="5" y="5" width="14" height="4" fill="#db2777" />
            {/* Flower hairpin accessory */}
            <circle cx="7" cy="5" r="1.5" fill="#fef08a" />
            <circle cx="7" cy="5" r="0.6" fill="#f59e0b" />

            {/* Inner soft hijab/hair frame */}
            <rect x="7" y="7" width="10" height="3" fill="#fbcfe8" />
            {/* Peach skin face */}
            <rect x="7" y="9" width="10" height="6" fill="#fce7f3" />
            <rect x="8" y="15" width="8" height="1" fill="#fbcfe8" />

            {!isSide ? (
              <>
                {/* Big expressive anime eyes with dual highlights */}
                <rect x="8" y="10.5" width="2" height="3" fill="#0f172a" />
                <rect x="8" y="10.5" width="1" height="1.5" fill="#ffffff" />
                <rect x="14" y="10.5" width="2" height="3" fill="#0f172a" />
                <rect x="14" y="10.5" width="1" height="1.5" fill="#ffffff" />
                {/* Cute eyelashes */}
                <rect x="7.5" y="10" width="1" height="1" fill="#0f172a" />
                <rect x="15.5" y="10" width="1" height="1" fill="#0f172a" />
                {/* Rosy blush */}
                <rect x="7" y="13" width="2" height="1" fill="#f43f5e" opacity="0.8" />
                <rect x="15" y="13" width="2" height="1" fill="#f43f5e" opacity="0.8" />
                {!hasMask && <rect x="11" y="13.5" width="2" height="1" fill="#e11d48" />}
              </>
            ) : (
              <>
                <rect x="12" y="10.5" width="2" height="3" fill="#0f172a" />
                <rect x="12" y="10.5" width="1" height="1.5" fill="#ffffff" />
                <rect x="13" y="13" width="2" height="1" fill="#f43f5e" opacity="0.8" />
              </>
            )}

            {hasMask && (
              <g>
                <rect x="8" y="12.5" width="8" height="3.5" fill="#e0f2fe" rx="0.5" />
                <rect x="9" y="13.5" width="6" height="1.5" fill="#38bdf8" opacity="0.6" />
                <rect x="7" y="13.5" width="1" height="1" fill="#cbd5e1" />
                <rect x="16" y="13.5" width="1" height="1" fill="#cbd5e1" />
              </g>
            )}
          </g>
        );

      case 'rayyan':
        return (
          <g>
            {/* Straw safari hat with band */}
            <rect x="5" y="4" width="14" height="2" fill="#ca8a04" />
            <rect x="7" y="2" width="10" height="3" fill="#eab308" />
            <rect x="7" y="4" width="10" height="1" fill="#047857" />
            <rect x="6" y="6" width="12" height="2" fill="#451a03" />
            {/* Face */}
            <rect x="7" y="8" width="10" height="7" fill="#fed7aa" />
            <rect x="8" y="10" width="2" height="3" fill="#0f172a" />
            <rect x="8" y="10" width="1" height="1" fill="#ffffff" />
            <rect x="14" y="10" width="2" height="3" fill="#0f172a" />
            <rect x="14" y="10" width="1" height="1" fill="#ffffff" />
            <rect x="7" y="12" width="2" height="1" fill="#fca5a5" />
            <rect x="15" y="12" width="2" height="1" fill="#fca5a5" />
            {!hasMask && <rect x="11" y="13" width="2" height="1" fill="#78350f" />}
            {hasMask && <rect x="8" y="12" width="8" height="3.5" fill="#e0f2fe" rx="0.5" />}
          </g>
        );

      case 'maya':
        return (
          <g>
            {/* Purple adventurer bandana with twin braids */}
            <rect x="6" y="3" width="12" height="5" fill="#9333ea" rx="1" />
            <rect x="5" y="7" width="14" height="3" fill="#7e22ce" />
            <rect x="5" y="9" width="3" height="6" fill="#581c87" />
            <rect x="16" y="9" width="3" height="6" fill="#581c87" />
            <rect x="7" y="8" width="10" height="7" fill="#fed7aa" />
            <rect x="8" y="10.5" width="2" height="3" fill="#0f172a" />
            <rect x="8" y="10.5" width="1" height="1" fill="#ffffff" />
            <rect x="14" y="10.5" width="2" height="3" fill="#0f172a" />
            <rect x="14" y="10.5" width="1" height="1" fill="#ffffff" />
            <rect x="7" y="13" width="2" height="1" fill="#fca5a5" />
            <rect x="15" y="13" width="2" height="1" fill="#fca5a5" />
            {!hasMask && <rect x="11" y="13.5" width="2" height="1" fill="#78350f" />}
            {hasMask && <rect x="8" y="12.5" width="8" height="3.5" fill="#e0f2fe" rx="0.5" />}
          </g>
        );

      case 'ketua':
        // Pak Kassim: Traditional velvet black Songkok with gold thread, kind wise eyes, neat mustache
        return (
          <g>
            <rect x="7" y="1" width="10" height="5" fill="#09090b" rx="0.5" />
            <rect x="6" y="4" width="12" height="2" fill="#18181b" />
            <rect x="7" y="5.5" width="10" height="0.5" fill="#eab308" />
            {/* Face */}
            <rect x="7" y="7" width="10" height="7" fill="#fed7aa" />
            {/* Kind eyes */}
            <rect x="8" y="9" width="2" height="2" fill="#18181b" />
            <rect x="14" y="9" width="2" height="2" fill="#18181b" />
            {/* Silver-grey wise mustache */}
            <rect x="9" y="12" width="6" height="1.5" fill="#e4e4e7" rx="0.5" />
            <rect x="8" y="13" width="2" height="1" fill="#d4d4d8" />
            <rect x="14" y="13" width="2" height="1" fill="#d4d4d8" />
          </g>
        );

      case 'nelayan':
        // Pak Samad: Broad straw hat with woven texture, sun-tanned skin, friendly smile
        return (
          <g>
            <rect x="4" y="3" width="16" height="2" fill="#ca8a04" />
            <rect x="7" y="1" width="10" height="3" fill="#eab308" />
            <rect x="6" y="4" width="12" height="2" fill="#a16207" />
            {/* Sun-tanned face */}
            <rect x="7" y="6" width="10" height="8" fill="#fcd34d" />
            <rect x="8" y="9" width="2" height="2" fill="#18181b" />
            <rect x="14" y="9" width="2" height="2" fill="#18181b" />
            {/* Smile & stubble */}
            <rect x="10" y="12" width="4" height="1" fill="#78350f" />
          </g>
        );

      case 'doktor':
        // Dr. Aiman: Neat parted hair, round doctor glasses, clean smile
        return (
          <g>
            <rect x="7" y="2" width="10" height="4" fill="#334155" />
            <rect x="6" y="4" width="12" height="3" fill="#1e293b" />
            {/* Face */}
            <rect x="7" y="7" width="10" height="7" fill="#fed7aa" />
            {/* Doctor glasses */}
            <rect x="8" y="9" width="3" height="3" fill="none" stroke="#0284c7" strokeWidth="0.8" />
            <rect x="13" y="9" width="3" height="3" fill="none" stroke="#0284c7" strokeWidth="0.8" />
            <rect x="11" y="10" width="2" height="0.5" fill="#0284c7" />
            {/* Eyes behind glasses */}
            <rect x="9" y="10" width="1" height="1.5" fill="#0f172a" />
            <rect x="14" y="10" width="1" height="1.5" fill="#0f172a" />
            {/* Smile */}
            <rect x="11" y="13" width="2" height="1" fill="#9a3412" />
          </g>
        );

      case 'anis':
        // Ibu Anis: Broad conical farmer hat (caping) with green band, cheerful pekebun sawit
        return (
          <g>
            {/* Conical caping farmer hat */}
            <polygon points="12,1 3,7 21,7" fill="#eab308" />
            <polygon points="12,2 5,7 19,7" fill="#facc15" />
            <rect x="4" y="6" width="16" height="1.5" fill="#15803d" />
            {/* Hair bangs */}
            <rect x="7" y="7.5" width="10" height="1.5" fill="#451a03" />
            {/* Cheerful face */}
            <rect x="7" y="8.5" width="10" height="6.5" fill="#fed7aa" />
            {/* Eyes & Rosy blush */}
            <rect x="8.5" y="10.5" width="1.5" height="2" fill="#0f172a" />
            <rect x="14" y="10.5" width="1.5" height="2" fill="#0f172a" />
            <rect x="7.5" y="12" width="1.5" height="1" fill="#f43f5e" />
            <rect x="15" y="12" width="1.5" height="1" fill="#f43f5e" />
            {!hasMask && <rect x="11" y="13" width="2" height="1" fill="#be123c" />}
            {hasMask && (
              <rect x="8" y="12" width="8" height="3" fill="#e0f2fe" rx="0.5" />
            )}
          </g>
        );

      case 'salmah':
        // Mak Cik Salmah: Violet traditional headscarf with gold floral motif
        return (
          <g>
            <rect x="6" y="2" width="12" height="9" fill="#7e22ce" rx="2" />
            <rect x="5" y="4" width="14" height="6" fill="#6b21a8" />
            <circle cx="7" cy="4" r="1" fill="#fde047" />
            <rect x="7" y="8" width="10" height="6" fill="#fed7aa" />
            <rect x="8.5" y="10" width="1.5" height="2" fill="#1e1b4b" />
            <rect x="14" y="10" width="1.5" height="2" fill="#1e1b4b" />
            {!hasMask && <rect x="11" y="13" width="2" height="1" fill="#9f1239" />}
            {hasMask && (
              <rect x="8" y="12" width="8" height="3" fill="#e0f2fe" rx="0.5" />
            )}
          </g>
        );

      case 'burhan':
        // Pak Burhan: Farmer straw cap with red bandana, moustache
        return (
          <g>
            <rect x="5" y="2" width="14" height="3" fill="#ca8a04" />
            <rect x="4" y="4" width="16" height="2" fill="#dc2626" />
            <rect x="7" y="6" width="10" height="8" fill="#fcd34d" />
            <rect x="8" y="8.5" width="2" height="2" fill="#18181b" />
            <rect x="14" y="8.5" width="2" height="2" fill="#18181b" />
            <rect x="9.5" y="11.5" width="5" height="1.5" fill="#451a03" />
            {hasMask && (
              <rect x="8" y="11" width="8" height="3.5" fill="#e0f2fe" rx="0.5" />
            )}
          </g>
        );
    }
  };

  // Render Harvest Moon style bodies (Overalls / Dungarees with brass buttons, plaid shirt, leather boots)
  const renderBody = () => {
    switch (id) {
      case 'adam':
        return (
          <g className={walkBounce}>
            {/* Red / Plaid shirt collar & sleeves */}
            <rect x="6" y="15" width="12" height="2" fill="#ef4444" />
            <rect x="5" y="16" width="2" height="4" fill="#ef4444" />
            <rect x="17" y="16" width="2" height="4" fill="#ef4444" />
            {/* White/Yellow gloves */}
            <rect x="4" y="19" width="3" height="2" fill="#fef08a" />
            <rect x="17" y="19" width="3" height="2" fill="#fef08a" />

            {/* Blue Denim Overalls / Dungarees */}
            <rect x="7" y="16" width="10" height="5" fill="#1d4ed8" />
            {/* Brass buckles on suspender straps */}
            <rect x="8" y="16" width="1.5" height="1.5" fill="#fde047" />
            <rect x="14.5" y="16" width="1.5" height="1.5" fill="#fde047" />
            {/* Front pocket */}
            <rect x="10" y="18" width="4" height="2.5" fill="#1e40af" />

            {/* Pants legs & boots */}
            <rect x="7" y="21" width="4" height="2" fill="#1e40af" className={legShift} />
            <rect x="13" y="21" width="4" height="2" fill="#1e40af" className={legShift} />
            {/* Sturdy brown farmer work boots */}
            <rect x="6" y="22.5" width="5" height="1.5" fill="#78350f" />
            <rect x="13" y="22.5" width="5" height="1.5" fill="#78350f" />
          </g>
        );

      case 'hawa':
        return (
          <g className={walkBounce}>
            {/* Teal/Aqua adventurer blouse */}
            <rect x="6" y="15" width="12" height="2" fill="#06b6d4" />
            <rect x="5" y="16" width="2" height="4" fill="#06b6d4" />
            <rect x="17" y="16" width="2" height="4" fill="#06b6d4" />
            {/* Hands */}
            <rect x="4" y="19" width="3" height="2" fill="#fed7aa" />
            <rect x="17" y="19" width="3" height="2" fill="#fed7aa" />

            {/* Dungarees / Jumpsuit in rich emerald/navy */}
            <rect x="7" y="16" width="10" height="5" fill="#047857" />
            <rect x="8" y="16" width="1.5" height="1.5" fill="#fef08a" />
            <rect x="14.5" y="16" width="1.5" height="1.5" fill="#fef08a" />
            <rect x="10" y="18" width="4" height="2.5" fill="#065f46" />

            {/* Legs & Cute hiking boots */}
            <rect x="7" y="21" width="4" height="2" fill="#065f46" className={legShift} />
            <rect x="13" y="21" width="4" height="2" fill="#065f46" className={legShift} />
            <rect x="6" y="22.5" width="5" height="1.5" fill="#854d0e" />
            <rect x="13" y="22.5" width="5" height="1.5" fill="#854d0e" />
          </g>
        );

      case 'ketua':
        return (
          <g className={walkBounce}>
            {/* Traditional Batik gold/brown Baju Melayu */}
            <rect x="6" y="14" width="12" height="7" fill="#b45309" />
            <rect x="5" y="15" width="2" height="4" fill="#92400e" />
            <rect x="17" y="15" width="2" height="4" fill="#92400e" />
            {/* Songket waist sash */}
            <rect x="6" y="17" width="12" height="2" fill="#eab308" />
            {/* Dark pants & shoes */}
            <rect x="7" y="21" width="4" height="3" fill="#18181b" />
            <rect x="13" y="21" width="4" height="3" fill="#18181b" />
          </g>
        );

      case 'nelayan':
        return (
          <g className={walkBounce}>
            {/* Blue fisherman vest & undershirt */}
            <rect x="6" y="14" width="12" height="7" fill="#0284c7" />
            <rect x="5" y="15" width="2" height="4" fill="#0369a1" />
            <rect x="17" y="15" width="2" height="4" fill="#0369a1" />
            {/* Roll-up fisherman trousers */}
            <rect x="7" y="20" width="4" height="2" fill="#78350f" />
            <rect x="13" y="20" width="4" height="2" fill="#78350f" />
            <rect x="6" y="22" width="5" height="2" fill="#451a03" />
            <rect x="13" y="22" width="5" height="2" fill="#451a03" />
          </g>
        );

      case 'doktor':
        return (
          <g className={walkBounce}>
            {/* Crisp white lab coat */}
            <rect x="6" y="14" width="12" height="8" fill="#f8fafc" />
            <rect x="5" y="15" width="2" height="5" fill="#f1f5f9" />
            <rect x="17" y="15" width="2" height="5" fill="#f1f5f9" />
            {/* Blue stethoscope loop */}
            <path d="M9 14 Q12 18 15 14" stroke="#0284c7" strokeWidth="1.2" fill="none" />
            <circle cx="12" cy="18" r="1" fill="#0284c7" />
            {/* Formal trousers & polished shoes */}
            <rect x="7" y="21" width="4" height="3" fill="#1e293b" />
            <rect x="13" y="21" width="4" height="3" fill="#1e293b" />
          </g>
        );

      case 'anis':
        return (
          <g className={walkBounce}>
            {/* Forest green plantation worker vest */}
            <rect x="6" y="14" width="12" height="7" fill="#15803d" />
            <rect x="5" y="15" width="2" height="4" fill="#166534" />
            <rect x="17" y="15" width="2" height="4" fill="#166534" />
            {/* Tool belt & palm cutter hook */}
            <rect x="6" y="18" width="12" height="1.5" fill="#78350f" />
            <rect x="15" y="18.5" width="2" height="3" fill="#94a3b8" />
            {/* Dark durable work trousers & muddy field boots */}
            <rect x="7" y="21" width="4" height="2" fill="#334155" className={legShift} />
            <rect x="13" y="21" width="4" height="2" fill="#334155" className={legShift} />
            <rect x="6" y="22.5" width="5" height="1.5" fill="#451a03" />
            <rect x="13" y="22.5" width="5" height="1.5" fill="#451a03" />
          </g>
        );

      case 'salmah':
        return (
          <g className={walkBounce}>
            {/* Purple traditional batik Baju Kurung */}
            <rect x="6" y="14" width="12" height="8" fill="#9333ea" />
            <rect x="5" y="15" width="2" height="5" fill="#7e22ce" />
            <rect x="17" y="15" width="2" height="5" fill="#7e22ce" />
            {/* Golden floral embroidery hem */}
            <rect x="6" y="20.5" width="12" height="1.5" fill="#fde047" />
            {/* Shoes */}
            <rect x="7" y="22" width="4" height="2" fill="#581c87" />
            <rect x="13" y="22" width="4" height="2" fill="#581c87" />
          </g>
        );

      case 'burhan':
        return (
          <g className={walkBounce}>
            {/* Brown farmer work tunic */}
            <rect x="6" y="14" width="12" height="7" fill="#b45309" />
            <rect x="5" y="15" width="2" height="4" fill="#92400e" />
            <rect x="17" y="15" width="2" height="4" fill="#92400e" />
            {/* Roll-up sleeves & sturdy denim trousers */}
            <rect x="7" y="21" width="4" height="2" fill="#1e3a8a" className={legShift} />
            <rect x="13" y="21" width="4" height="2" fill="#1e3a8a" className={legShift} />
            <rect x="6" y="22.5" width="5" height="1.5" fill="#78350f" />
            <rect x="13" y="22.5" width="5" height="1.5" fill="#78350f" />
          </g>
        );

      default:
        return (
          <g className={walkBounce}>
            <rect x="6" y="15" width="12" height="6" fill="#f59e0b" />
            <rect x="7" y="21" width="4" height="3" fill="#1e293b" />
            <rect x="13" y="21" width="4" height="3" fill="#1e293b" />
          </g>
        );
    }
  };

  const getFacingFlip = () => {
    if (direction === 'left') return 'scale-x-[-1]';
    return '';
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center pixelated select-none ${getFacingFlip()} transition-transform`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]"
        shapeRendering="crispEdges"
      >
        {renderHead()}
        {renderBody()}
      </svg>
    </div>
  );
};
