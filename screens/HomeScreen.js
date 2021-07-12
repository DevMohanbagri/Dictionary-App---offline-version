import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import dictionary from '../database';

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            text: '',
            displayText: ''
        }
    }
    getWord=(text)=>{
      var text = text.toLowerCase().trim()

      try{
      var word = dictionary[text]["word"]
      var lexicalCategory = dictionary[text]["lexicalCategory"]
      var definition = dictionary[text]["definition"]
        this.setState({"word" : word, 
        "lexicalcategory": lexicalCategory,
        "definition": definition})
      }
      catch(err){
       Alert.alert("The word is not existing in the database") 
       this.setState({
         'text': '',
         'isSearchPressed': false
       })
      }
    }

    render(){
      return(
        <SafeAreaProvider>
         <View style = {styles.container}>
           <Header
             centerComponent = {{text:'Dictionary App', style:{color: 'black', fontSize: 22}              }}
             backgroundColor = '#3e52ed'
           />

           <TextInput style= {styles.inputBox}
              onChangeText={(text)=>{
                this.setState({
                    text: text,
                    isSearchPressed: false,
                    word: "Loading..." ,
                    lexicalCategory: '',
                    examples: [],
                    definition: ""
                })
              }}
           />

            <TouchableOpacity onPress={()=> {
         
          }}
            style = {styles.searchButton}>
                <Text style ={styles.buttonText}>Search</Text>
            </TouchableOpacity>

            <View>
              <Text>
                {this.state.isSearchPressed && this.state.word==="Loading..."
                ?this.state.word
                :""
                }
              </Text>
              
            </View>

            <Text style={styles.textStyle}>Word:{""}</Text>
            <Text style = {styles.outputText}>{this.state.word}</Text>
           
            <Text style={styles.textStyle}>Type:{""}</Text>
            <Text style = {styles.outputText}>{this.state.lexicalCategory}</Text>
           
            <Text style={styles.textStyle}>Definition:{""}</Text>
            <Text style = {styles.outputText}>{this.state.definition}</Text>
            </View>

        </SafeAreaProvider>
      )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none'
  },
  searchButton: {
    width: '35%',
    height: 40,
    alignSelf: 'center',
    padding: 3,
    margin: 20,
    backgroundColor: '#8fb3ef'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textStyle:{
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 10
  },
  outputText:{
    fontSize: 18,
    marginLeft: 10
  }
});
