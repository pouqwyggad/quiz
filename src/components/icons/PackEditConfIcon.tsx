import React, {
  FC, PropsWithChildren, forwardRef, Ref,
} from 'react';
import PropTypes from 'prop-types';

interface PackEditConfIconProps {
  className?: string;
  onClick: () => void;
}

export const PackEditConfIcon: FC<PropsWithChildren<PackEditConfIconProps> & {
  ref: Ref<HTMLButtonElement>
}> = forwardRef(
  ({ className, onClick }, ref) => (
    <button type="button" className={className} onClick={onClick} ref={ref}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" stroke="#0D0C0B" />
        <circle cx="12.0005" cy="8.50024" r="0.875" fill="black" />
        <circle cx="12.0005" cy="11.9998" r="0.875" fill="black" />
        <circle cx="12.0005" cy="15.5" r="0.875" fill="black" />
      </svg>
    </button>
  ),
);

PackEditConfIcon.defaultProps = {
  className: '',
};

PackEditConfIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
