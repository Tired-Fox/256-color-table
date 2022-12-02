from phml import PHMLCore

core = PHMLCore(scopes=["./"]).load("index.phml")
core.write("index.html")