import poker_cards as poker_cards

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


    def check_current_position(self, cards: list[str], community_cards: list[str], other_hands: list[list[str]]):
        self.update_cards(cards)
        self.update_cards(community_cards)
        for hand in other_hands:
            self.update_cards(hand)

    def calculate_odds(self, cards, other_hands):
        return


    def check_for_royal_flush(self, cards, community_cards):
        combined_list = cards + community_cards
        royal_hearts = ['AH', 'KH', 'QH', 'JH', 'TH']
        royal_clubs = ['AC', 'KC', 'QC', 'JC', 'TC']
        royal_spades = ['AS', 'KS', 'QS', 'JS', 'TS']
        royal_diamonds = ['AD', 'KD', 'QD', 'JD', 'TD']

        if all(card in royal_hearts for card in combined_list):
            return True
        if all(card in royal_clubs for card in combined_list):
            return True
        if all(card in royal_spades for card in combined_list):
            return True
        if all(card in royal_diamonds for card in combined_list):
            return True
        return False

    def check_for_straight_flush(self, cards, community_cards):
        combined_list = cards + community_cards
        sorted_list1 = sorted(combined_list, key=lambda x: ('23456789TJQKA'.index(x[:-1]), x[-1]))
        sorted_list2 = sorted(combined_list, key=lambda x: ('A23456789TJQK'.index(x[:-1]), x[-1]))

        same_suit = all(card[-1] == sorted_list1[0][-1] for card in sorted_list1)

        values1 = ''.join(card[:-1] for card in sorted_list1)
        values2 = ''.join(card[:-1] for card in sorted_list2)

        consecutive_high = '23456789TJQHKA' in values1
        consecutive_low = 'A23456789TJQHK' in values2

        consecutive = consecutive_high or consecutive_low

        return same_suit and consecutive
    
    def check_for_four_of_a_kind(self, cards, community_cards):
        combined_list = cards + community_cards

        value_counts = {}

        for card in combined_list:
            if card[0] in value_counts.keys():
                value_counts[card[0]] += 1
            else:
                value_counts[card[0]] = 1
        
        for count in value_counts.values():
            if count == 4:
                return True
        return False

    
    def check_for_full_house(self, cards, community_cards):
        combined_list = cards + community_cards

        value_counts = {}

        for card in combined_list:
            if card[0] in value_counts.keys():
                value_counts[card[0]] += 1
            else:
                value_counts[card[0]] = 1
            
        three_of_a_kind = False
        pair = False

        for count in value_counts.values():
            if count == 3:
                three_of_a_kind = True
            if count == 2:
                pair = True

        return three_of_a_kind and pair
    
    def check_for_flush(self, cards, community_cards):
        combined_list = cards + community_cards

        suit_counts = {}

        for card in combined_list:
            if card[1] in suit_counts.keys():
                suit_counts[card[1]] += 1
            else:
                suit_counts[card[1]] = 1

        for count in suit_counts.values():
            if count >= 5:
                return True
        return False
    
    def check_for_straight(self, cards, community_cards):
        combined_list = cards + community_cards
        sorted_list1 = sorted(combined_list, key=lambda x: ('23456789TJQKA'.index(x[:-1]), x[-1]))
        sorted_list2 = sorted(combined_list, key=lambda x: ('A23456789TJQK'.index(x[:-1]), x[-1]))

        values1 = ''.join(card[:-1] for card in sorted_list1)
        values2 = ''.join(card[:-1] for card in sorted_list2)

        consecutive_high = '23456789TJQHKA' in values1
        consecutive_low = 'A23456789TJQHK' in values2

        consecutive = consecutive_high or consecutive_low

        return consecutive
    
    def check_for_three_of_a_kind(self, cards, community_cards):
        combined_list = cards + community_cards

        value_counts = {}

        for card in combined_list:
            if card[0] in value_counts.keys():
                value_counts[card[0]] += 1
            else:
                value_counts[card[0]] = 1

        for count in value_counts.values():
            if count == 3:
                return True
        return False
    
    def check_for_two_pair(self, cards, community_cards):
        combined_list = cards + community_cards

        value_counts = {}

        for card in combined_list:
            if card[0] in value_counts.keys():
                value_counts[card[0]] += 1
            else:
                value_counts[card[0]] = 1

        pair_count = 0
        for count in value_counts.values():
            if count == 2:
                pair_count += 1
        if pair_count >= 2:
            return True
        return False
    
    def check_for_pair(self, cards, community_cards):
        combined_list = cards + community_cards

        value_counts = {}

        for card in combined_list:
            if card[0] in value_counts.keys():
                value_counts[card[0]] += 1
            else:
                value_counts[card[0]] = 1
        
        for count in value_counts.values():
            if count == 2:
                return True
        return False
