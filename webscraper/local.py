import glob
import re
import sys
import json
from bs4 import BeautifulSoup


# Define a function which takes in a filename and a label
def process(filename, label):
    # open and read the html file
    with open(filename, "r") as f:
        html = f.read()

    # parse the html file using BeautifulSoup
    soup = BeautifulSoup(html, "html.parser")

    # Find the first "a" element with content that starts with "https://lootstudios.com/wp-content/uploads"
    # and set the href attribute value to a variable
    link = soup.find(
        "a",
        href=lambda x: x and x.startswith("https://lootstudios.com/wp-content/uploads"),
    )["href"]
    # From link, extract the section of the link matching regex [0-9]{4}/[0-9]{2}
    # and set it to a variable
    date = re.search("[0-9]{4}/[0-9]{2}", link).group(0)

    # Find a tag that looks like "<span class="html-tag">&lt;title&gt;</span>", and
    # return the parent
    name = soup.find(
        "span", class_="html-tag", string=lambda x: x and x.startswith("<title>")
    ).parent.get_text()
    # Remove the "<title>" and "</title>" tags from name
    name = name.replace("<title>", "").replace("</title>", "")
    # Remove all whitespace from the start and end of name
    name = name.strip()

    result = {}
    result["collection"] = label
    result["date"] = date
    result["name"] = name
    result["minis"] = []

    # Find all <span>s whose content starts "miniExplorerMini"
    minis = soup.find_all(
        "span", string=lambda x: x and x.startswith("miniExplorerMini")
    )

    # foreach element in minis, find its first <tr> ancestor.
    # Then, find the next 4 <tr>s and select the <td> element with class "line-content"
    for mini in minis:
        container = mini.find_parent("tr")
        attributes = []
        miniData = {}
        for i in range(4):
            container = container.find_next("tr")
            attributes.append(container.find("td", class_="line-content"))

        # Each <td> in attributes contains an even number of spans with name/value pairs
        # We want to extract the name/value pairs and add them to the result dictionary
        # the spans have to have a class of "html-attribute-name" or "html-attribute-value"
        for attribute in attributes:
            spans = attribute.find_all(
                "span", class_=lambda x: x and x.startswith("html-attribute")
            )
            # Check that spans has an even number of elements
            i = 0
            while i < spans.__len__():
                if "html-attribute-name" in spans[i].attrs["class"]:
                    clss = spans[i].get_text()
                    value = ""
                    if spans.__len__() >= i + 2:
                        if "html-attribute-value" in spans[i + 1].attrs["class"]:
                            value = spans[i + 1].get_text()
                            i += 1
                    miniData[clss] = value
                i += 1

        result["minis"].append(miniData)

    return result


# Main function
if __name__ == "__main__":
    # Read folder path from the first argument, and find
    # all ".html" files in that folder
    folder_path = sys.argv[1]
    # Label is the name of the folder
    label = folder_path.split("/")[-1]
    files = glob.glob(folder_path + "/*.html")

    result = []
    for file_path in files:
        sys.stderr.write("_")
    sys.stderr.write("\r")
    for file_path in files:
        try:
            r = process(file_path, label)
        except Exception as e:
            r = {}
            r["error"] = "Error processing file " + file_path + ": " + str(e)
        sys.stderr.write(".")
        result.append(r)

# output the result in json format
print(json.dumps(result))
