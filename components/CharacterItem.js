import React from 'react';
import Link from 'next/link';

import styles from '../styles/CharacterItem.module.scss';

const CharacterItem = props => {
	const { data } = props;
	return (
		<Link href={'detail/' + data.id}>
			<div className={styles.card}>
				<img src={data.thumbnail.path + '/standard_fantastic.jpg'} />
				<h2>{data.name}</h2>
			</div>
		</Link>
	);
};

export default CharacterItem;