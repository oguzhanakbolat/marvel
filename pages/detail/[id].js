import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacterDetailAsync } from '../../stores/listSlice';
import styles from '../../styles/Detail.module.scss';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Detail() {
	const { list } = useSelector(state => state);
	const [comics, setComics] = useState([]);
	const dispatch = useDispatch();
	const router = useRouter();
	const id = router.query.id;

	useEffect(() => {
		if(id) {
			dispatch(getCharacterDetailAsync(id));
		}
		
	}, [dispatch, id]);

	useEffect(() => {

		if(list.character?.comics) {
			let newSeries = list.character?.comics?.items.map(item => {
				const newItem = { ...item };

				const name = newItem.name;
				let split = name.split('(');


				if(split.length > 1) {
					split = split[1].split(')');
					const date = parseInt(split[0]);

					if(date) {
						newItem.date = date;
					}
					else {
						newItem.date = '';
					}
				}
        
				return newItem;
			});

			newSeries = newSeries.sort( (a, b) => {
				return b.date - a.date;
			});
			setComics(newSeries.slice(0,10));
		}
	}, [list.character]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Marvel Characters</title>
				<meta name="description" content="Marvel Characters" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			{
				list.character && 
				<main className={styles.main}>
					<header>
						{
							!list.loading && <img src={list.character?.thumbnail?.path + '/standard_fantastic.jpg'} />
						}
						
					</header>

					<div className={styles.grid}>
						{
							!list.loading && 
							<>
								<h3>{list.character?.name}</h3>
								<p>{list.character?.description}</p>

								<ul>
									{
										comics.map((item, index) =>
											<li key={index}>{item.date} - {item.name}</li>
										)
									}
								</ul>
								
							</>
						}
						<Link href={'/'}>
							<h4>Geri</h4>
						</Link>
					</div>
				</main>
			}

			<Footer />
		</div>
	);
}
