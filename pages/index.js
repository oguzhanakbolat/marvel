import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useScroll } from '../hooks/useScroll';
import { getCharacterListAsync, setScrollBottom } from '../stores/listSlice';
import CharacterItem from '../components/CharacterItem';
import styles from '../styles/Home.module.scss';
import Footer from '../components/Footer';

export default function Home() {
	const { list } = useSelector(state => state);
	const dispatch = useDispatch();
	const scroll = useScroll();

	useEffect(() => {
		if(list.scrollBottom) {
			dispatch(getCharacterListAsync({
				limit: list.limit,
				offset: list.offset
			}));
		}
	}, [list.scrollBottom]);

	useEffect(() => {
		if(scroll.bottom && !list.scrollBottom && scroll.scroll > 200) {
			dispatch(setScrollBottom(true));
		}
	}, [scroll.bottom ]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Marvel Characters</title>
				<meta name="description" content="Marvel Characters" />
				<link rel="icon" href="/favicon.png" />
			</Head>

			<main className={styles.main}>
				<header/>

				<div className={styles.grid}>
					{
						list.list.map((item, index) => 
							<CharacterItem key={index} data={item}/>
						)
					}

					{
						list.loading && 
						<div className={styles.card}>
							<h2>Loading...</h2>
							<p>Characters: <strong>{list.list.length} / {list.total}</strong></p>
						</div>
					}
				</div>
			</main>

			<Footer />
		</div>
	);
}
