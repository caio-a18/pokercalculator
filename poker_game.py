import poker_cards

class PokerGame:

    def __init__(self, player_count, community_cards):
        self.player_count = player_count
        self.community_cards = community_cards
        self.all_cards = poker_cards.all_cards
        self.hearts = poker_cards.hearts
        self.clubs = poker_cards.clubs
        self.spades = poker_cards.spades
        self.diamonds = poker_cards.diamonds

    def update_cards(self, cards: list[str]):
        try:
            self.all_cards = [card for card in self.all_cards if card not in cards]
        except:
            print("error removing from all_cards") 
        try:
            self.hearts = [card for card in self.hearts if card not in cards]
        except:
            print("error removing from hearts") 
        try:
            self.clubs = [card for card in self.clubs if card not in cards]
        except:
            print("error removing from clubs") 
        try:
            self.spades = [card for card in self.spades if card not in cards]
        except:
            print("error removing from spades") 
        try:
            self.diamonds = [card for card in self.diamonds if card not in cards]
        except:
            print("error removing from diamonds") 


    def check_position(self, cards: list[str], community_cards: list[str], other_hands: list[list[str]]):
        return

