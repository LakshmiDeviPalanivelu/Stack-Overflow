from sklearn.externals import joblib
import _pickle as pickle
import warnings
warnings.filterwarnings("ignore")
import pandas as pd
import scipy
import numpy as np
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize  # Tokenize a string to split off punctuation other than periods  
from nltk.stem.snowball import SnowballStemmer # Stemmers remove morphological affixes from words, leaving only the word stem.
import requests
import json  
import nltk
import sys
nltk.download('stopwords') 

def striphtml(data):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, ' ', str(data))
    return cleantext

stop_words = set(stopwords.words('english'))
stemmer = SnowballStemmer("english")
#################use this to check 

#jsn={ "title":"this is in the tag field of the post","string":"get multipl javascript setinterv function play nice togeth page written custom anim function jqueri plugin use loop function seem work fine tri includ one page time effect get mess render complet proper done scout around stackoverflow googl gather problem act global method properti object one page end overwrit correct solut jqueri plugin manag uniqu interv function wonder possibl set local uniqu properti plugin object creat function manag multipl anim call various differ plugin function juggl one global call idea anyon help pleas edit" }
#input_jsn=json.dumps(jsn)#Remove this when using the requests
j1={}
#input_title=sys.argv[1]
#input_question= sys.argv[2]
if len(sys.argv)>=3:
    #print("Inside model: ",input_title,input_question)
    j1["title"]=str(sys.argv[1])
    j1["string"]=str(sys.argv[2])
    input_jsn=json.dumps(j1)
    #print("input_jsn: ", input_jsn)
else:
    print("Please pass the title and question strings as argments")
    exit()

j2=json.loads(input_jsn)
title=j2["title"]
string=j2["string"]

if string:
    question=string
    x = len(question)+len(title)
    code = str(re.findall(r'<code>(.*?)</code>', question, flags=re.DOTALL)) # get the complete code

    question=re.sub('<code>(.*?)</code>', '', question, flags=re.MULTILINE|re.DOTALL) #remove the code from the question
    question=striphtml(question.encode('utf-8')) # remove the tags from the question.

    title=title.encode('utf-8')

    question=str(title)+" "+str(question)
    question=re.sub(r'[^A-Za-z]+',' ',question) # regular expression to remove all other charecters except alpha replace with space
    words=word_tokenize(str(question.lower())) #Tokenize  question to split off punctuation other than periods
    question=' '.join(str(stemmer.stem(j)) for j in words if j not in stop_words and (len(j)!=1 or j=='c')) # remove the unecessary endings of questions

#print("this is the title:{}, string:{}".format(title,string))
#print("this is the tockenized string:", question)

d={"question":question , "tags":"new"}
pd_question=pd.DataFrame(data=d, index=[0])
#print("pd_question: ", pd_question)
classifier = joblib.load("/Users/rajeshri/Downloads/Stack_Overflow_UI/server/lr_pipeline.pkl") # check this file exist in the folder  alt use "lr_pipline_3wt_title.pkl"
#print("classifier: ", classifier)
predictions1 = classifier.predict(pd_question['question'])
#print("predictions1: ", predictions1)

if predictions1.count_nonzero() == 0:
    output_jsn=json.dumps({"tags": ""})
    #print("no Tags sorry")
    print(output_jsn)
else:
    tupl=predictions1.nonzero()
    lists=tupl[1]
    pickle_in=open("/Users/rajeshri/Downloads/Stack_Overflow_UI/server/saved_dict_3wt.pkl","rb")
    dict_2=pickle.load(pickle_in)
    pickle_in.close()
    #tags=[]
    tags=""
    for i in lists:
        if dict_2[i]:
            #tags.append(dict_2[i])
            if len(tags)==0:
                tags=tags+dict_2[i]
            else:
                tags=tags+" "+dict_2[i]
    out_dict={}
    #out_dict["tags"]= tags
    #output_jsn=json.dumps(out_dict)
    print(tags)