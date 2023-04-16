from bookmarks.models import Category, Bookmark
from lxml import html

def validate_import_file(soup, user,container,createdCategories):
    if user.is_subscribed:
        for i in container:
            categoryObject, created = Category.objects.get_or_create(user=user, title=i)
            if created:
                createdCategories.append(categoryObject)
            for j in container[i]:
                bookmarkObj, created = Bookmark.objects.get_or_create(category=categoryObject, name=j[1], url=j[0])
                bookmarkObj.save()
        return True
    return _validate_categories(soup, user,container,createdCategories)


def _validate_categories(soup, user,container,createdCategories):
    userCategories = Category.objects.filter(user=user)
    categories = container
    if len(categories) + len(userCategories) > 5:
        return False

    for category in categories:
        bookmarks = categories[category]

        userBookmarks = []
        try:
            categoryObject = Category.objects.get(user=user, title=category)
            userBookmarks = Bookmark.objects.filter(user=user, category=categoryObject)
        except Exception as e:
            pass

        if len(bookmarks) + len(userBookmarks) > 10:
            return False

        # for bookmark in bookmarks:
        #     bookmark.decompose()

    # otherLinks = soup.find_all('a')
    # if len(otherLinks) > 0 and len(categories) + len(userCategories) >= 5:
    #     return False
    #
    # if len(otherLinks) > 5:
    #     return False
    for i in container:
        # print('\t', i)
        categoryObject, created = Category.objects.get_or_create(user=user, title=i)
        if created:
            createdCategories.append(categoryObject)
        for j in container[i]:
            # print(j)
            # try:
            bookmarkObj, created = Bookmark.objects.get_or_create(category=categoryObject, name=j[1],url=j[0])
            bookmarkObj.save()
    return True

#
# def import_from_browser_bookmarks2(soup, createdCategories, user):
#     print('SAAS  '*15)
#
#     categories = soup.find_all('h3')
#     for category in categories:
#         # print('---------------------------------------------------')
#         # print(category)
#         # print('---------------------------------------------------')
#         # print( category.find_next_sibling("dl"))
#
#             try:
#                 bookmarks = category.find_next_sibling("dl").find_all("dt")
#             except:
#                 print('start')
#                 print(soup)
#                 b = html.fromstring(soup)
#                 # dl = b.xpath("//body/dl")[0]
#                 res = b.xpath("//body//h3 | //body//a")
#                 # print(html.tostring(dl))
#                 # print(res)
#
#                 container = {}
#                 turn = ''
#                 for i in res:
#                     i_str = str(i)
#                     i_desc = html.tostring(i)
#
#                     if 'h3' in i_str:
#
#                         name = i.xpath('text()')
#                         if turn != name:
#                             container[name[0]] = []
#                             turn = name[0]
#
#                     if 'a' in i_str and turn != '':
#                         url = i.xpath('@href')
#
#                         if url != []:
#                             url = url[0]
#                             text = 'Empty' if i.xpath('text()') == [] else i.xpath('text()')[0]
#                             if 'chrome://bookmarks' in url:
#                                 turn = list(container.keys())[0]
#                             else:
#                                 container[turn].append([url, text])
#
#                 for i in container:
#                     # print('\t', i)
#                     categoryObject, created = Category.objects.get_or_create(user=user, title=i)
#                     if created:
#                         createdCategories.append(categoryObject)
#                     for j in container[i]:
#                         # print(j)
#                         # try:
#                         bookmarkObj, created = Bookmark.objects.get_or_create(category=categoryObject, name=j[1],url=[0])
#                         bookmarkObj.save()
#                 break
#
#
#
#             categoryObject, created = Category.objects.get_or_create(user=user, title=category.get_text())
#             if created:
#                 createdCategories.append(categoryObject)
#             for bookmark in bookmarks:
#                 url = bookmark.find('a')
#                 try:
#                     bookmarkObj, created = Bookmark.objects.get_or_create(category=categoryObject, name=url.get_text(),
#                                                                           url=url['href'])
#                     description = bookmark.find('div', {'class': 'description'})
#                     if description:
#                         bookmarkObj.description = description.get_text()
#                         bookmarkObj.save()
#                 except Exception as e:
#                     print(e)
#                     bookmark.decompose()

def import_from_browser_bookmarks(soup, createdCategories, user):
    # print('SAAS  '*15)

    print('start')
    # print(soup)
    b = html.fromstring(str(soup))
    # dl = b.xpath("//body/dl")[0]
    res = b.xpath("//body//h3 | //body//a")
    # print(html.tostring(dl))
    # print(res)
    container = {}
    turn = ''
    for i in res:
        i_str = str(i)
        i_desc = html.tostring(i)
        if 'h3' in i_str:
            name = i.xpath('text()')
            if turn != name:
                container[name[0]] = []
                turn = name[0]
        if 'a' in i_str and turn != '':
            url = i.xpath('@href')
            if url != []:
                url = url[0]
                text = 'Empty' if i.xpath('text()') == [] else i.xpath('text()')[0]
                if 'chrome://bookmarks' in url:
                    turn = list(container.keys())[0]
                else:
                    container[turn].append([url, text])
    return container
    # for i in container:
    #     # print('\t', i)
    #     categoryObject, created = Category.objects.get_or_create(user=user, title=i)
    #     if created:
    #         createdCategories.append(categoryObject)
    #     for j in container[i]:
    #         # print(j)
    #         # try:
    #         bookmarkObj, created = Bookmark.objects.get_or_create(category=categoryObject, name=j[1],url=j[0])
    #         bookmarkObj.save()






# def import_other_bookmarks(soup, createdCategories, user, category_name):
#     print('caqarto')
#     otherLinks = soup.find_all('a')
#     if len(otherLinks) > 0:
#         category_obj, created = Category.objects.get_or_create(
#             user=user, title=category_name)
#         if created:
#             createdCategories.append(category_obj)
#         for url in otherLinks:
#             try:
#                 Bookmark.objects.get_or_create(category=category_obj, name=url.get_text(), url=url['href'])
#             except Exception as e:
#                 print(e)
#             url.decompose()
