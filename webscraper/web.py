import glob
import re
import sys
import json
import requests
from bs4 import BeautifulSoup


# Define a function which takes in a filename and a label
def process(url, label):
    # Fetch the html file from the URL
    html = requests.get(url).text

    # parse the html file using BeautifulSoup
    soup = BeautifulSoup(html, "html.parser")

    # Find the first "a" element with content that starts with "https://lootstudios.com/wp-content/uploads"
    # and set the href attribute value to a variable
    link = soup.find(
        "img",
        src=lambda x: x and x.startswith("https://lootstudios.com/wp-content/uploads"),
    )["src"]
    # From link, extract the section of the link matching regex [0-9]{4}/[0-9]{2}
    # and set it to a variable
    date = re.search("[0-9]{4}/[0-9]{2}", link).group(0)

    # Find the <title> tag and return the text in it
    title = soup.find("title")
    print(title)
    name = title.get_text()

    result = {}
    result["collection"] = label
    result["date"] = date
    result["name"] = name
    result["minis"] = []

    # Find all <div>s whose class is "bscCarouselItem"
    minis = soup.find_all("div", class_="bscCarouselItem")

    # foreach element in minis, read all the attributes of the div
    # and save the value of the attributes into a dict
    for mini in minis:
        miniData = {}
        for attr in mini.attrs:
            if attr == "class":
                continue
            if attr == "mini":
                continue
            miniData[attr] = mini.attrs[attr]

        result["minis"].append(miniData)

    return result


# Main function
if __name__ == "__main__":
    # Read folder path from the first argument, and find
    # all ".txt" files in that folder
    folder_path = sys.argv[1]

    files = glob.glob(folder_path + "/*.txt")
    result = []

    for urls_path in files:
        # Label is the name of the urls file
        label = urls_path.split("/")[-1].split(".")[0]

        # The urls file should contain one url per line
        # Read the urls file and store the urls in a list
        with open(urls_path, "r") as f:
            urls = f.readlines()

        for url in urls:
            sys.stderr.write("_")
        sys.stderr.write("\r")
        for url in urls:
            try:
                r = process(url, label)
            except Exception as e:
                r = {}
                r["error"] = "Error processing " + url + ": " + str(e)
            sys.stderr.write(".")
            sys.stderr.flush()
            result.append(r)
        sys.stderr.write("\n")

# output the result in json format
print(json.dumps(result))
