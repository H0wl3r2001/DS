from urllib.request import urlopen
from bs4 import BeautifulSoup
import datetime
import json
import locale
#  features(CERTEFICADOE  LICENCIA), size,
locale.setlocale(locale.LC_TIME,"pt_PT")
all_data = []
all_links=set()
urls=["https://www.olx.pt/d/imoveis/casas-moradias-para-arrendar-vender/moradias-arrenda/porto/","https://www.olx.pt/d/imoveis/apartamento-casa-a-venda/apartamentos-arrenda/porto/","https://www.olx.pt/d/imoveis/quartos-para-aluguer/porto/"]
for index in range(3):
    done = False
    page_number = 1

    while not done:
        url=urls[index]
        if page_number!=1:
            url = url+"?page="+str(page_number)
        page = urlopen(url)
        html_bytes = page.read()
        html = html_bytes.decode("utf-8")

        soup = BeautifulSoup(html, "html.parser")
        all_listings = soup.find_all("a", {"class": "css-1bbgabe"})
        if len(all_listings)==0:
            done=True  
        for listing in all_listings:
            name=listing.find("h6", {"class": "css-1pvd0aj-Text eu5v0x0"})
            img=listing.find("img", {})
            image_source = img.get("src")
            if(image_source== None):
                image_source="https://www.fparceirosazoia.pt/photos/shares/default/default.jpg"
            price=listing.find("p", {"data-testid": "ad-price"})
            location_and_date=listing.find("p", {"data-testid": "location-date"})
            split_location=location_and_date.get_text().split("-")
            date=split_location[1]
            link=listing.get("href")
            if "imovirtual" in link:
                continue
            link="https://www.olx.pt"+link
            if link not in all_links:
                all_links.add(link)
            else:
                continue
            if "Hoje" in date:
                month=datetime.datetime.now().strftime("%B")
                day=datetime.datetime.now().strftime("%d")
                year=datetime.datetime.now().strftime("%Y")
                date=day+" de "+month+ " de "+year
            elif "topo" in date:
                date=date[14:]

            olx_page = urlopen(link)
            olx_html_bytes = olx_page.read()
            olx_html = olx_html_bytes.decode("utf-8")
            soup = BeautifulSoup(olx_html, "html.parser")
            all_extras= soup.find_all("p",{"class": "css-xl6fe0-Text eu5v0x0"})
            nr_rooms="1"
            size="Not Provided"
            nr_bathrooms="Not Provided"
            features = {"license":"","energetic_certificate":""}
            for extra in all_extras:
                text_extra=extra.get_text()
                if "Tipologia" in text_extra:
                    nr_rooms=text_extra.split(": T")[1]
                elif "Nº Licença de utilização" in text_extra:
                    features["license"]=text_extra.split(": ")[1]
                elif "Certificado Energético:" in text_extra:
                    features["energetic_certificate"]=text_extra.split(": ")[1]
                elif "Área útil" in text_extra:
                    area=text_extra.split(": ")[1]
                    size=area.split(" m")[0]
                elif "Casas de Banho" in text_extra:
                    nr_bathrooms=text_extra.split(": ")[1]
            description_div=soup.find("div",{"data-cy":"ad_description"})
            description=description_div.find("div",{}).get_text() 
            all_img = soup.find_all("div",{"class":"swiper-zoom-container"})
            all_img_src = []
            for image in all_img:
                temp_image = image.find("img",{})
                image_src = temp_image.get("src")
                if image_src==None:
                    image_src = temp_image.get("data-src")
                all_img_src.append(image_src)
            if index==0:
                propertyType="house"
            elif index==1:
                propertyType="flat"
            elif index==2:
                propertyType="bedroom"
            data = { "title":name.get_text() , "price":price.get_text(), "thumbnail":image_source, "location":split_location[0] , "date":date, "url":link,"images":all_img_src,"rooms": nr_rooms,"description":description, "propertyType":propertyType,"features":features,"size":size,"bathroom":nr_bathrooms}
            all_data.append(data)
        page_number+=1

python_obj = json.dumps(all_data)
with open("olx_listings.json", "w",encoding="utf-8") as outfile:
    outfile.write(python_obj)
