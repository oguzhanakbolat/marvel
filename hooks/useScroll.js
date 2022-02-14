import { useState, useEffect } from 'react';

export function useScroll() {
	const [bodyOffset, setBodyOffset] = useState();
	const [scroll, setScroll] = useState();
	const [bottom, setBottom] = useState(false);

	const listener = () => {
		setBodyOffset(document?.body.getBoundingClientRect());
		setScroll(-bodyOffset?.y);
		setBottom(bodyOffset?.y + (bodyOffset?.height - window.innerHeight) < 100);
	};

	useEffect(() => {
		window.addEventListener('scroll', listener);
		return () => {
			window.removeEventListener('scroll', listener);
		};
	});

	return {
		scroll,
		bottom,
	};
}