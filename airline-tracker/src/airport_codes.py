from urllib.request import urlopen

def strip_html(value): # strips HTML tags from the scraped names
    index = value.find("<")
    while index >= 0:
        end_index = value.find(">")
        value = value[:index] + value[end_index+1:]
        index = value.find("<")
    return " ".join(value.split())

url = "https://www.leonardsguide.com/us-airport-codes.shtml"
page = urlopen(url).read().decode("utf-8") # string rendering of the entire HTML code

pos = page.find("<tr")
state = ''
file = open("./airport_codes.json", "w")
file.write("[\n")

airport_entries = []

while pos >= 0:
    # check if the current position is an element of a state --> if it does not have a '>' immediately after
    if page[pos+3] != '>': # is a state
        pos = page.find("<td", pos) + 10
        end_state = page.find("</span", pos)
        state = page[pos:end_state]
        
    else: # current row is not a state
        pos = page.find("<td", pos) + 4
        name = page[pos:page.find("</td", pos)]
        name = strip_html(name)
        pos = page.find("<td", pos) + 4
        id = page[pos:page.find("</td", pos)]
        airport_entries.append(f"\t{{\n\t\t\"name\": \"{name}\",\n\t\t\"id\": \"{id}\",\n\t\t\"state\": \"{state}\"\n\t}}")

    pos = page.find("<tr", pos) # go to start of next table row

file.write(",\n".join(airport_entries))
file.write("\n]")
file.close()