import React, { Component } from 'react';
import Firebase from 'firebase';
import Share from 'react-native-share';
import {
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Text,
    View
} from 'react-native';

const ref = new Firebase('https://shining-fire-4744.firebaseio.com');

export default class QuoteEdit extends Component {
    constructor(props) {
        super(props);
        var authData = ref.getAuth().uid;
        this.ref = ref.child('users/' + authData + '/data');
        this.state = {
            newQuote: quote,
            newAuthor: author,
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <TextInput style={styles.input}
                        maxNumberOfLines={10}
                        value={this.state.newQuote}
                        onChangeText={(quote) => this.setState({newQuote: quote})}
                    />
                    <TextInput style={styles.input}
                        maxNumberOfLines={1}
                        value={this.state.newAuthor}
                        onChangeText={(author) => this.setState({newAuthor: author})}
                    />
                </View>
                <View>
                    <TouchableHighlight style={styles.button}
                        onPress={() => this.updateQuote()}
                        underlayColor='#6a5750'>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.share}
                        onPress={() => this.onShare()}>
                        <Text style={styles.shareText}>
                            Share
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
    updateQuote() {
        this.ref.child(id).update({
            quote: this.state.newQuote,
            author: this.state.newAuthor
        }, (error) => {
            if (error) {
                alert("Synchronization failed.");
            } else {
                alert("Quote updated successfully!");
            }
        });
    }
    onShare() {
        message = quote + '\n-' + author
        Share.open({
            share_text: message,
            share_URL: "",
            title: 'Share Link'
        },(e) => {
            console.log(e);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F1ED',
    },
    rightContainer: {
        marginTop: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 35,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        fontSize: 15,
        fontFamily: 'Avenir',

        fontWeight: 'bold'
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        width: 150,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#6a5750',
        marginTop: 30,
        marginBottom: 185
    },
    btnText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#6a5750'
    },
    share: {
        justifyContent: 'center',
    },
    shareText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#935347',
      marginTop: 5,
      marginBottom: 5,
  }
});

module.exports = QuoteEdit;
