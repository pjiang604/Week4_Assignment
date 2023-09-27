import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { Image } from 'expo-image';

export default function Home({ }) {

    const [data, setData] = useState();
    const [shouldShow, setShouldShow] = useState(true);

    var apiKey = "34a175fb90d84639a816ef25413c7d0a";
    var type = 'tesla';
    var dateFrom = "2023-09-25";
    var dateTo = "2023-09-25";
    var sortBy = "publishedAt";
    var pageSize = 5;

    const url = `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&apiKey=${apiKey}&pageSize=${pageSize}`;

    const GrabNews = (e) => {
        axios.get(url)
            .then((response) => {
                console.clear();
                setData(response.data);
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {shouldShow ? (<Button width='100px' height='100px' title="Grab Info" style={styles.button} onPress={() => { GrabNews(); setShouldShow(!shouldShow) }}></Button>) : null}
                {
                    data && data.articles.map((d, index) => {
                        return (
                            <View style={styles.newsContainer} key={index}>
                                <View style={styles.image}>
                                    {d.urlToImage && <Image  width={150} height={150} source={d.urlToImage} alt="image" />}
                                </View>

                                    <Text style={styles.author}>{d.author}</Text>
                                    <Text style={styles.title}>{d.title}</Text>
                                </View>
                                )
                    })
                }
                            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100vw'
    },
    newsContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100vw',
        padding: 10
    },
    image: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold'
    }


});
